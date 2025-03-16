import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log(request.body);
  // const resp =  axiosInstance
  //       .post(`/worship/${params.eventID}/remove-guest`, {
  //         request.guest_id,
  //       })
  return NextResponse.next();
}
