import { NextRequest } from "next/server";
import { axiosInstance } from "./app/axiosInstance";

export default async function isAuthenticated(request: NextRequest) {
  const access_token = request.cookies.get("access_token")?.value;
  const refresh_token = request.cookies.get("refresh_token")?.value;
  if (!access_token) {
    return false;
  }
  try {
    const check_auth = await axiosInstance.get("/check-auth/", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (check_auth.status === 200) return true;
  } catch (err) {}

  if (!refresh_token) return false;
  // for some reason, axios throws an error '{refresh: [This field is required]}'
  try {
    const resp = await fetch("http://localhost:8000/api/refresh-token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ refresh: refresh_token }),
    });
    const data = await resp.json();

    request.cookies.set("access_token", data.access);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
