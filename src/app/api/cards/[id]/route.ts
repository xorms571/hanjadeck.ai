import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const user = await getCurrentUser();

    if (!user || user.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    const { id: cardId } = await params;
    if (!cardId) {
        return new NextResponse('Card ID is required', { status: 400 });
    }

    try {
        const body = await request.json();
        const { character, korean, english, examples } = body; // Updated fields

        const updatedCard = await prisma.card.update({
            where: { id: cardId },
            data: {
                character,
                korean,
                english,
                examples, // examples should be an array of strings
            },
        });

        return NextResponse.json(updatedCard);
    } catch (error) {
        console.error('Error updating card:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
