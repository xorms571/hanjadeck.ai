import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import type { Role, Card } from '@prisma/client'; // Import Card type again

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
    bookmarks: { card: Card }[]; // Add bookmarked cards
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

    const user = await prisma.user.findUnique({
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
        bookmarks: { // Include bookmarks and select the card within each
            select: {
                card: true,
            },
        },
      },
    });

    if (user) {
        return user as User; // Cast to the updated User type
    }

    return null;

  } catch (error) {
    // Catches errors from jwt.verify (invalid token, expired)
    console.log('Authentication error:', error);
    return null;
  }
}
