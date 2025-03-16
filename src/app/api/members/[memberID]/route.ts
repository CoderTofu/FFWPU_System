import { axiosInstance } from "@/app/axiosInstance";
import { getAccessToken } from "@/lib/auth";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { memberID: string } }
) {
  const { memberID } = params;
  const response = await axiosInstance.get(`/members/${memberID}`, {
    headers: { Authorization: `Bearer ${await getAccessToken()}` },
  });
  console.log(response);
  if (response.status >= 200 && response.status <= 299) {
    return NextResponse.json(response.data);
  }
  return NextResponse.json({});
}

export async function DELETE(request: NextApiRequest) {
  const { memberID } = request.query;
  const response = await axiosInstance.delete(`/members/${memberID}`, {
    headers: { Authorization: `Bearer ${await getAccessToken()}` },
  });
  if (response.status >= 200 && response.status <= 299) {
    return NextResponse.json({ message: "Successfully deleted" });
  }
  return NextResponse.json({});
}
