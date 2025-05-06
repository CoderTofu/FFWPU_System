import { fetchWithAuth } from '@/lib/auth';
type RouteContext = {
  params: {
    blessingID: string;
  };
};

export async function GET(request: Request, context: RouteContext) {
  const { blessingID } = context.params;
  const res = await fetchWithAuth(`/blessing/${blessingID}`, {
    method: 'GET',
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
export async function DELETE(request: Request, context: RouteContext) {
  const { blessingID } = context.params;
  const res = await fetchWithAuth(`/blessing/${blessingID}/`, {
    method: 'DELETE',
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
export async function PATCH(request: Request, context: RouteContext) {
  const { blessingID } = context.params;
  const body = await request.json();
  const res = await fetchWithAuth(`/blessing/${blessingID}/`, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
