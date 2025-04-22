"use server";

import { fetchWithAuth, getAccessToken } from "@/lib/auth";
import { NextApiRequest } from "next";
import { headers } from "next/headers";
import { axiosInstance } from "@/app/axiosInstance";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const resp = await fetchWithAuth(`/worship-attendee/${id}`, {
    method: "GET",
  });
  if (resp.status >= 200 && resp.status <= 299) {
    return NextResponse.json(resp.data);
  }
  return NextResponse.json({});
}

export async function DELETE(request: NextApiRequest, { params }) {
  const { id } = await params;
  const resp = await fetchWithAuth(`/worship-attendee/${id}/`, {
    method: "DELETE",
  });
  if (resp.status >= 200 && resp.status <= 299) {
    return NextResponse.json(resp.data);
  }
  return NextResponse.json({});
}

export async function PATCH(
  request: Request,
  { params }: { params: { eventID: string } }
) {
  const body = await request.json();
  const { eventID } = await params;
  console.log(body);
  try {
    const resp = await fetchWithAuth(`/worship-attendee/${eventID}/`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });

    return Response.json(resp.data);
  } catch (err) {
    return Response.json({});
  }
}
