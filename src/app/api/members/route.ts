'use server';

import { axiosInstance } from '@/app/axiosInstance';
import { fetchWithAuth, getAccessToken, getRefreshToken, setTokens } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const response = await fetchWithAuth('/member', {
    method: 'GET',
  });
  if (response.status >= 200 && response.status <= 299) return NextResponse.json(response.data);

  return NextResponse.json({});
}
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const resp = await fetchWithAuth('/member/', {
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
