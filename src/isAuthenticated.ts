import { NextRequest } from "next/server";
import { axiosInstance } from "./app/axiosInstance";
export default async function isAuthenticated(request: NextRequest) {
  const access_token = request.cookies.get("access_token")?.value;
  const refresh_token = request.cookies.get("refresh_token")?.value;
  if (!access_token) {
    return false;
  }
  try {
    const check_auth = await axiosInstance.get("/check-auth", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (check_auth.status === 200) return true;
  } catch (err) {}

  if (!refresh_token) return false;

  try {
    const refresh = await axiosInstance.post("/refresh-token", {
      refresh: refresh_token,
    });
    if (refresh.status === 200) {
      request.cookies.set("access_token", refresh.data.access);
      return true;
    }
  } catch (err) {}

  return false;
}
