"use server";
import { axiosInstance } from "@/app/axiosInstance";
import { fetchWithAuth, getAccessToken } from "@/lib/auth";
import { NextApiRequest } from "next";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const resp = await fetchWithAuth("/member-mission/", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (resp.status >= 200 && resp.status <= 299) {
    return NextResponse.json(resp.data);
  }
  return NextResponse.json({});
}
