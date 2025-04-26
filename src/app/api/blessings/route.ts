import { fetchWithAuth } from "@/lib/auth";

export async function POST(request: Request) {
  const res = await fetchWithAuth("/blessings/", {
    method: "POST",
    body: JSON.stringify(await request.json()),
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
export async function GET(request: Request) {
  const res = await fetchWithAuth("/blessings", {
    method: "GET",
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
