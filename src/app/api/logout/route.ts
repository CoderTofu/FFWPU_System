"use server";

import { NextRequest, NextResponse } from "next/server";
import { deleteTokens } from "@/lib/auth";

export async function POST(request: NextRequest) {
  await deleteTokens();
  return NextResponse.json({ body: "logged out" }, { status: 200 });
}
