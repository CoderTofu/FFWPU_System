import { cookies } from "next/headers";

export async function getAccessToken() {
  const access_token = (await cookies()).get("access_token");
  return access_token?.value;
}

export async function getRefreshToken() {
  const refresh_token = (await cookies()).get("refresh_token");
  return refresh_token?.value;
}

export async function setTokens(access, refresh) {
  (await cookies()).set({
    name: "access_token",
    value: access,
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    maxAge: 5,
  });
  return (await cookies()).set({
    name: "refresh_token",
    value: refresh,
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    maxAge: 24 * 60 * 60,
  });
}

export async function deleteTokens() {
  (await cookies()).delete("access_token");
  return (await cookies()).delete("refresh_token");
}

export async function refreshToken(refresh_token) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/refresh-token/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refresh_token }),
    }
  );
  if (response.ok) {
    const { access } = await response.json();
    await setTokens(access, refresh_token);
    return access;
  }
  return null;
}
