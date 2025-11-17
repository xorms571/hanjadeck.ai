import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import type { Role, Card } from '@prisma/client';
import { updateUserStreak } from './user'; // Import updateUserStreak

// Define the type for the decoded JWT payload
interface JwtPayload {
  userId: string;
}

// Define the type for the user object returned by this function
export type User = {
    id: string;
    name: string;
    email: string;
    imageUrl: string | null;
    role: Role;
    streak: number;
    learnedCount: number;
    masteredCount: number;
    reviewCount: number;
    lastSeenAt: Date | null; // Add lastSeenAt
    bookmarks: { card: Card }[];
};

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return null;
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined.');
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    let user = await prisma.user.findUnique({ // Use 'let' because we might update it
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        imageUrl: true,
        role: true,
        streak: true,
        learnedCount: true,
        masteredCount: true,
        reviewCount: true,
        lastSeenAt: true, // Select lastSeenAt
        bookmarks: {
            select: {
                card: true,
            },
        },
      },
    });

    if (user) {
        // Update user streak and lastSeenAt
        const streakInfo = await updateUserStreak(user); // Update the user object
        user.streak = streakInfo.streak;
        user.lastSeenAt = streakInfo.lastSeenAt;
        return user as User;
    }

    return null;

  } catch (error) {
    console.log('Authentication error:', error);
    return null;
  }
}
