'use server';

import { axiosInstance } from '@/app/axiosInstance';
import { fetchWithAuth, getAccessToken, getRefreshToken } from '@/lib/auth';
import { NextApiRequest } from 'next';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const response = await fetchWithAuth(`/member/${id}`, {
    method: 'GET',
  });
  // const response = await axiosInstance.get(`/members/${memberID}`, {
  //   headers: { Authorization: `Bearer ${await getAccessToken()}` },
  // });
  if (response.status >= 200 && response.status <= 299) {
    return NextResponse.json(response.data);
  }
  return NextResponse.json({});
}

export async function DELETE(request: Request, { params }) {
  const { id } = await params;
  const res = await fetchWithAuth(`/member/${id}/`, {
    method: 'DELETE',
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}

export async function PATCH(request: Request, { params }) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    const resp = await fetchWithAuth(`/member/${id}/`, {
      method: 'PATCH',
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
