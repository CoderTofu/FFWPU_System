"use server";

import { fetchWithAuth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { event_id, guest_id } = await request.json();
  const response = await fetchWithAuth(`/worship/${event_id}/remove-guest`, {
    method: "POST",
    body: JSON.stringify({ guest_id }),
  });
  return NextResponse.json(response.data);
}
