import { fetchWithAuth } from '@/lib/auth';

export async function GET(request: Request) {
  const res = await fetchWithAuth('/user', {
    method: 'GET',
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
