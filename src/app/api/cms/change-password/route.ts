'use server';

import { fetchWithAuth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const resp = await fetchWithAuth('/change-password/', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (resp.status >= 200 && resp.status <= 299) {
    return NextResponse.json(resp.data);
  }
  return NextResponse.json({});
}
