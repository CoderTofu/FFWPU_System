import { fetchWithAuth } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetchWithAuth('/donation/', {
    method: 'POST',
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
export async function GET(request: Request) {
  const res = await fetchWithAuth('/donation', {
    method: 'GET',
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
