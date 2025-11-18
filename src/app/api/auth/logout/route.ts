import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
export const dynamic = "force-dynamic";

export async function POST() {
  // To log out, we clear the cookie by setting its maxAge to 0
  const serializedCookie = serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0, // Set maxAge to 0 to expire the cookie immediately
    path: '/',
  });

  const response = NextResponse.json({ message: 'Logged out successfully' });
  response.headers.set('Set-Cookie', serializedCookie);

  return response;
}
