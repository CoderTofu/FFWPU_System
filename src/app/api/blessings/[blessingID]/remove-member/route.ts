"use server";

import { fetchWithAuth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }) {
  const { blessingID } = await params;
  const { member_id } = await request.json();
  const response = await fetchWithAuth(
    `/blessings/${blessingID}/remove-member`,
    {
      method: "PATCH",
      body: JSON.stringify({ member_id }),
    }
  );
  return NextResponse.json(response.data);
}
