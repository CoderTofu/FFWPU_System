import { fetchWithAuth } from '@/lib/auth';
type RouteContext = {
  params: {
    id: string;
  };
};
export async function DELETE(request: Request, context: RouteContext) {
  const { id } = context.params;
  const res = await fetchWithAuth(`/subregion/${id}/`, {
    method: 'DELETE',
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
