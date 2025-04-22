import { fetchWithAuth } from "@/lib/auth";

export async function DELETE(request: Request, { params }) {
  const { id } = await params;
  const res = await fetchWithAuth(`/region/${id}/`, {
    method: "DELETE",
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
