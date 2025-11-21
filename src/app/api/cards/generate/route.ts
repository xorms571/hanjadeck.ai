import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateCardDataFromAI } from '@/lib/ai';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const session = await getCurrentUser();
        if (!session) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const { searchTerm, userId } = await req.json();

        if (!searchTerm || typeof searchTerm !== 'string' || searchTerm.trim().length === 0) {
            return NextResponse.json({ message: 'Invalid search term' }, { status: 400 });
        }

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // 1. Call AI to generate card data
        const aiResponse = await generateCardDataFromAI(searchTerm.trim());

        if (aiResponse.error) {
            return NextResponse.json({ message: aiResponse.error }, { status: 400 });
        }

        const { character, korean, english, examples } = aiResponse.card;

        // 2. Check if the card already exists
        let existingCard = await prisma.card.findUnique({
            where: { character },
        });

        if (existingCard) {
            // If card exists, create an interaction for the user if one doesn't exist
            await prisma.userCardInteraction.upsert({
                where: {
                    userId_cardId: {
                        userId,
                        cardId: existingCard.id,
                    },
                },
                update: {}, // No specific update needed, just ensure it exists
                create: {
                    userId,
                    cardId: existingCard.id,
                    seenAt: new Date(),
                },
            });
            return NextResponse.json(existingCard, { status: 200 });
        }

        // 3. Save the new card to the database
        const newCard = await prisma.card.create({
            data: {
                character,
                korean,
                english,
                examples,
                interactions: {
                    create: {
                        userId,
                        seenAt: new Date(),
                    },
                },
            },
        });

        return NextResponse.json(newCard, { status: 201 });

    } catch (error) {
        console.error('Card generation API error:', error);
        if (error instanceof SyntaxError) {
            return NextResponse.json({ message: 'AI returned an invalid response format.' }, { status: 502 });
        }
        return NextResponse.json({ message: 'An unexpected error occurred on the server.' }, { status: 500 });
    }
}
