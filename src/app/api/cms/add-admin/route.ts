import { fetchWithAuth } from '@/lib/auth';

export async function POST(request: Request) {
  const res = await fetchWithAuth('/add-admin/', {
    method: 'POST',
    body: JSON.stringify(await request.json()),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
