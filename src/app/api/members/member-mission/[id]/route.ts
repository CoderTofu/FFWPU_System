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
export async function PATCH(request: Request, context: RouteContext) {
  const { id } = context.params;
  const body = await request.json();
  const res = await fetchWithAuth(`/member-mission/${id}/`, {
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

export async function DELETE(request: Request, context: RouteContext) {
  const { id } = context.params;
  const res = await fetchWithAuth(`/member-mission/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.status >= 200 && res.status <= 299) {
    return Response.json(res.data);
  }
  return Response.json({});
}
