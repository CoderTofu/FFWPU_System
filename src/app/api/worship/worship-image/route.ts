import { fetchWithAuth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const resp = await fetchWithAuth(`/worship-image/`, {
      method: 'POST',
      body: formData,
      // Remove Content-Type header to let the browser set it with boundary
    });

    if (resp.status >= 200 && resp.status <= 299) {
      return NextResponse.json(resp.data);
    }
    return NextResponse.json({ error: resp.statusText }, { status: resp.status });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
