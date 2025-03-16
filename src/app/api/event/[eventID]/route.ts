import { getAccessToken } from "@/lib/auth";
import { NextApiRequest } from "next";
import { headers } from "next/headers";
import { axiosInstance } from "@/app/axiosInstance";
import { NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params }: { params: { eventID: string } }
) {
  const { eventID } = params;
  const resp = await axiosInstance.get(`/worship/${eventID}`, {
    headers: { Authorization: `Bearer ${await getAccessToken()}` },
  });
  if (resp.status >= 200 && resp.status <= 299) {
    return NextResponse.json(resp.data);
  }
  return NextResponse.json({});
}

export async function DELETE(request: NextApiRequest) {}

export async function PATCH(request: Request) {}
