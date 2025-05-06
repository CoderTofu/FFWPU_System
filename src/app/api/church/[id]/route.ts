'use server';

import { axiosInstance } from '@/app/axiosInstance';
import { fetchWithAuth, getAccessToken, getRefreshToken } from '@/lib/auth';
import { NextApiRequest } from 'next';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

type RouteContext = {
  params: {
    id: string;
  };
};
export async function GET(request: Request, context: RouteContext) {
  const { id } = context.params;
  const response = await fetchWithAuth(`/church/${id}`, {
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

export async function DELETE(request: Request, context: RouteContext) {
  const { id } = context.params;
  const res = await fetchWithAuth(`/church/${id}/`, {
    method: 'DELETE',
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = context.params;
  const body = await request.json();
  const res = await fetchWithAuth(`/church/${id}/`, {
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
