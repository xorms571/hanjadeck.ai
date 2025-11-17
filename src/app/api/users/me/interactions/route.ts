import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { cardId } = await request.json();
  if (!cardId) {
    return new NextResponse('Card ID is required', { status: 400 });
  }

  try {
    // Check if interaction already exists
    const existingInteraction = await prisma.userCardInteraction.findUnique({
      where: {
        userId_cardId: {
          userId: user.id,
          cardId: cardId,
        },
      },
    });

    if (!existingInteraction) {
      // If it's a new interaction, create it and increment learnedCount
      await prisma.$transaction(async (tx) => {
        await tx.userCardInteraction.create({
          data: { userId: user.id, cardId: cardId },
        });

        await tx.user.update({
          where: { id: user.id },
          data: { learnedCount: { increment: 1 } },
        });

        // Check if the card is currently NOT bookmarked (i.e., mastered)
        const isBookmarked = await tx.bookmark.findUnique({
          where: {
            userId_cardId: {
              userId: user.id,
              cardId: cardId,
            },
          },
        });

        if (!isBookmarked) {
          // If not bookmarked, it means it's "mastered" (seen and not bookmarked)
          await tx.user.update({
            where: { id: user.id },
            data: { masteredCount: { increment: 1 } },
          });
        }
      });
    }

    return new NextResponse('Interaction recorded and counts updated', { status: 200 });
  } catch (error) {
    console.error('INTERACTION_POST_ERROR', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
