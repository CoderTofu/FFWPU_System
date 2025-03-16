"use server";

import { fetchWithAuth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { event_id, member_id } = await request.json();
  const response = await fetchWithAuth(`/worship/${event_id}/remove-attendee`, {
    method: "POST",
    body: JSON.stringify({ member_id }),
  });
  return NextResponse.json(response.data);
}
