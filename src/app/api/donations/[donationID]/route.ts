import { fetchWithAuth } from '@/lib/auth';

type RouteContext = {
  params: {
    donationID: string;
  };
};
export async function GET(request: Request, context: RouteContext) {
  const { donationID } = context.params;
  const res = await fetchWithAuth(`/donation/${donationID}`, {
    method: 'GET',
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
export async function DELETE(request: Request, context: RouteContext) {
  const { donationID } = context.params;
  const res = await fetchWithAuth(`/donation/${donationID}/`, {
    method: 'DELETE',
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
export async function PATCH(request: Request, context: RouteContext) {
  const { donationID } = context.params;
  const body = await request.json();
  const res = await fetchWithAuth(`/donation/${donationID}/`, {
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
