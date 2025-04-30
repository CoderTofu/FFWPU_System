import { fetchWithAuth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request, { params }) {
  try {
    const { id } = await params;
    const resp = await fetchWithAuth(`/worship-image/${id}/`, {
      method: 'DELETE',
    });

    if (resp.status >= 200 && resp.status <= 299) {
      return NextResponse.json(resp.data);
    }
    return NextResponse.json({ error: resp.statusText }, { status: resp.status });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
