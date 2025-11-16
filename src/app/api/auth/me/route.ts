import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

interface JwtPayload {
  userId: string;
}

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return new NextResponse('Unauthorized: No token provided', { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in the environment variables.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { // Explicitly select fields to return, excluding password
        id: true,
        name: true,
        email: true,
        imageUrl: true,
        role: true,
        streak: true,
        learnedCount: true,
        masteredCount: true,
        reviewCount: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!user) {
      return new NextResponse('Unauthorized: User not found', { status: 401 });
    }

    return NextResponse.json(user);

  } catch (error) {
    // This will catch errors like invalid token, expired token etc.
    if (error instanceof jwt.JsonWebTokenError) {
        return new NextResponse('Unauthorized: Invalid token', { status: 401 });
    }
    console.error('ME_API_ERROR', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
