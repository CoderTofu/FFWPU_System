"use server";

import { axiosInstance } from "@/app/axiosInstance";
import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, getRefreshToken, setTokens } from "@/lib/auth";
export async function POST(request: NextRequest) {
  const access_token = await getAccessToken();
  const refresh_token = await getRefreshToken();
  if (access_token && refresh_token) {
    return NextResponse.json({ status: 200 });
  }
  const requestData = await request.json();
  const response = await axiosInstance.post(
    `${process.env.NEXT_PUBLIC_API_URL}/login/`,
    requestData
  );
  if (response.status >= 200 && response.status <= 299) {
    const { access, refresh } = response.data;
    await setTokens(access, refresh);
  }
  return NextResponse.json({ body: response.data }, { status: 200 });
}
