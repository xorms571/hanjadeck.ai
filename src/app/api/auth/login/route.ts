import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { serialize } from 'cookie';
export const dynamic = "force-dynamic";

const MAX_AGE = 60 * 60 * 24; // 1 day in seconds

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse('Missing email or password', { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return new NextResponse('Invalid credentials', { status: 401 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return new NextResponse('Invalid credentials', { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in the environment variables.');
    }

    // Sign the JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: MAX_AGE,
      }
    );
    
    // Serialize the cookie
    const serializedCookie = serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: MAX_AGE,
        path: '/',
    });

    // Do not send the password hash back to the client
    const { password: _, ...userWithoutPassword } = user;

    // Return the user info in the body and the token in a cookie
    const response = NextResponse.json({ user: userWithoutPassword });
    response.headers.set('Set-Cookie', serializedCookie);

    return response;

  } catch (error) {
    console.error('LOGIN_ERROR', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
