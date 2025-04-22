"use server";

import { axiosInstance } from "@/app/axiosInstance";
import {
  fetchWithAuth,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = await fetchWithAuth("/subregion", {
    method: "GET",
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

export async function POST(request: Request) {
  const body = await request.json();
  const resp = await fetchWithAuth("/subregion/", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (resp.status >= 200 && resp.status <= 299) {
    return NextResponse.json(resp.data);
  }
  return NextResponse.json({});
}

export async function DELETE(request: Request, { params }) {
  const { id } = await params;
  const res = await fetchWithAuth(`/region/${id}`, {
    method: "DELETE",
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
