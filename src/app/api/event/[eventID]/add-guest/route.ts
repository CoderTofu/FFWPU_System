"use server";

import { fetchWithAuth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { event_id, name, email, invited_by } = await request.json();
  const response = await fetchWithAuth(`/worship/${event_id}/add-guest`, {
    method: "POST",
    body: JSON.stringify({ name, email, invited_by }),
  });
  return NextResponse.json(response.data);
}
