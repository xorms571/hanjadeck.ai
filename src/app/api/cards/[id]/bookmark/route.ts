import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  console.log('Bookmark API POST params:', params); // Debugging line
  const { id: cardId } = await params; // Explicitly destructure and await

  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  if (!cardId) {
    return new NextResponse('Card ID is required', { status: 400 });
  }

  try {
    // Check if card exists
    const card = await prisma.card.findUnique({ where: { id: cardId } });
    if (!card) {
      return new NextResponse('Card not found', { status: 404 });
    }

    // Check if already bookmarked
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_cardId: {
          userId: user.id,
          cardId: cardId,
        },
      },
    });

    if (existingBookmark) {
      return new NextResponse('Card already bookmarked', { status: 409 });
    }

    const bookmark = await prisma.bookmark.create({
      data: {
        userId: user.id,
        cardId: cardId,
      },
    });

    return NextResponse.json(bookmark, { status: 201 });
  } catch (error) {
    console.error('BOOKMARK_POST_ERROR', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  console.log('Bookmark API DELETE params:', params); // Debugging line
  const { id: cardId } = await params; // Explicitly destructure and await

  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  if (!cardId) {
    return new NextResponse('Card ID is required', { status: 400 });
  }

  try {
    // Check if bookmark exists
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_cardId: {
          userId: user.id,
          cardId: cardId,
        },
      },
    });

    if (!existingBookmark) {
      return new NextResponse('Bookmark not found', { status: 404 });
    }

    await prisma.bookmark.delete({
      where: {
        userId_cardId: {
          userId: user.id,
          cardId: cardId,
        },
      },
    });

    return new NextResponse('Bookmark removed', { status: 200 });
  } catch (error) {
    console.error('BOOKMARK_DELETE_ERROR', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
