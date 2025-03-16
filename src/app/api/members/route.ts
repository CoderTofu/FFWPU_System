"use server";

import { axiosInstance } from "@/app/axiosInstance";
import { getAccessToken, getRefreshToken, setTokens } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = await axiosInstance.get("/members", {
    headers: { Authorization: `Bearer ${await getAccessToken()}` },
  });
  if (response.status >= 200 && response.status <= 299)
    return NextResponse.json(response.data);
  const retry = await fetch("/refresh-token/", {
    method: "POST",
    body: JSON.stringify({ refresh: await getRefreshToken() }),
  });
  if (retry.ok) {
  }
  return NextResponse.json({});
}
