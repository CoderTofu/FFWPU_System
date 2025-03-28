import { fetchWithAuth } from "@/lib/auth";

export async function POST(request: Request) {
  const res = await fetchWithAuth("/donations/", {
    method: "POST",
    body: JSON.stringify(await request.json()),
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
export async function GET(request: Request) {
  const res = await fetchWithAuth("/donations", {
    method: "GET",
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
