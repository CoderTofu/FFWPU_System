"use server";

import { axiosInstance } from "@/app/axiosInstance";
import { fetchWithAuth, getAccessToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const resp = await fetchWithAuth("/worship-attendee", {
    method: "GET",
  });
  if (resp.status >= 200 && resp.status <= 299) {
    return NextResponse.json(resp.data);
  }
  return NextResponse.json({});
}

export async function POST(request: Request) {
  const body = await request.json();
  const resp = await fetchWithAuth("/worship-attendee/", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (resp.status >= 200 && resp.status <= 299) {
    return NextResponse.json(resp.data);
  }
  return NextResponse.json({});
}
