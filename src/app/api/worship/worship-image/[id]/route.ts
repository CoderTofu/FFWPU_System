import { fetchWithAuth } from '@/lib/auth';
import { NextResponse } from 'next/server';

type RouteContext = {
  params: {
    id: string;
  };
};
export async function DELETE(request: Request, context: RouteContext) {
  try {
    const { id } = context.params;
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
