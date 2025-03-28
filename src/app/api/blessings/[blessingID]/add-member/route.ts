"use server";

import { fetchWithAuth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }) {
  const { blessingID } = await params;
  const body = await request.json();
  const response = await fetchWithAuth(`/blessings/${blessingID}/add-member`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  return NextResponse.json(response.data);
}
