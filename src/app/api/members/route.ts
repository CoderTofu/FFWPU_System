import { axiosInstance } from "@/app/axiosInstance";
import { getAccessToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = await axiosInstance.get("/members", {
    headers: { Authorization: `Bearer ${await getAccessToken()}` },
  });
  if (response.status >= 200 && response.status <= 299)
    return NextResponse.json(response.data);
  return NextResponse.json({});
}
