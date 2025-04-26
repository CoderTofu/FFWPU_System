"use server";

import { fetchWithAuth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }) {
  const { blessingID } = await params;
  const guest = await request.json();
  const response = await fetchWithAuth(
    `/blessings/${blessingID}/remove-guest`,
    {
      method: "POST",
      body: JSON.stringify(guest),
    }
  );
  return NextResponse.json(response.data);
}
