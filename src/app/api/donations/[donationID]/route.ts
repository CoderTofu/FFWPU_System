import { fetchWithAuth } from "@/lib/auth";

export async function GET(request: Request, { params }) {
  const { donationID } = await params;
  const res = await fetchWithAuth(`/donations/${donationID}`, {
    method: "GET",
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
export async function DELETE(request: Request, { params }) {
  const { donationID } = await params;
  const res = await fetchWithAuth(`/donations/${donationID}`, {
    method: "DELETE",
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
export async function PATCH(request: Request, { params }) {
  const { donationID } = await params;
  const body = await request.json();
  const res = await fetchWithAuth(`/donations/${donationID}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
