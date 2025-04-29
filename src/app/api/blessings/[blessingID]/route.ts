import { fetchWithAuth } from '@/lib/auth';

export async function GET(request: Request, { params }) {
  const { blessingID } = await params;
  const res = await fetchWithAuth(`/blessing/${blessingID}`, {
    method: 'GET',
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
export async function DELETE(request: Request, { params }) {
  const { blessingID } = await params;
  const res = await fetchWithAuth(`/blessing/${blessingID}/`, {
    method: 'DELETE',
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
export async function PATCH(request: Request, { params }) {
  const { blessingID } = await params;
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
