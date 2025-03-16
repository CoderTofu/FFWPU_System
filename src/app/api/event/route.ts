"use server";

import { axiosInstance } from "@/app/axiosInstance";
import { getAccessToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const resp = await axiosInstance.get("/worship", {
    headers: { Authorization: `Bearer ${await getAccessToken()}` },
  });
  if (resp.status >= 200 && resp.status <= 299) {
    return NextResponse.json(resp.data);
  }
  return NextResponse.json({});
}
