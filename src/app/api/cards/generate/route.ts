import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateCardDataFromAI } from '@/lib/ai';
import { getCurrentUser } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const session = await getCurrentUser();
        const { searchTerm, userId } = await req.json();

        if (!searchTerm || typeof searchTerm !== 'string' || searchTerm.trim().length === 0) {
            return NextResponse.json({ message: 'Invalid search term' }, { status: 400 });
        }

        const generateAndSaveCard = async (creatorId: string | null) => {
            const aiResponse = await generateCardDataFromAI(searchTerm.trim());

            if (aiResponse.error) {
                return NextResponse.json({ message: aiResponse.error }, { status: 400 });
            }

            const { character, korean, english, examples } = aiResponse.card;

            let existingCard = await prisma.card.findUnique({
                where: { character },
            });

            if (existingCard) {
                if (creatorId) {
                    await prisma.userCardInteraction.upsert({
                        where: {
                            userId_cardId: {
                                userId: creatorId,
                                cardId: existingCard.id,
                            },
                        },
                        update: {},
                        create: {
                            userId: creatorId,
                            cardId: existingCard.id,
                            seenAt: new Date(),
                        },
                    });
                }
                return NextResponse.json(existingCard, { status: 200 });
            }

            const newCard = await prisma.card.create({
                data: {
                    character,
                    korean,
                    english,
                    examples,
                    creatorId: creatorId,
                },
            });

            return NextResponse.json(newCard, { status: 201 });
        };

        if (session && userId) {
            return await generateAndSaveCard(userId);
        } else {
            const cookieStore = await cookies();
            const generationCountCookie = cookieStore.get('generation-count');
            let count = generationCountCookie ? parseInt(generationCountCookie.value, 10) : 0;
            if (isNaN(count)) {
                count = 0;
            }

            if (count >= 3) {
                return NextResponse.json({ message: 'Guest generation limit exceeded. Please log in to continue.' }, { status: 429 });
            }

            const generationResponse = await generateAndSaveCard(null);

            if (generationResponse.status >= 400) {
                return generationResponse;
            }

            const cardData = await generationResponse.json();
            const response = NextResponse.json(cardData, { status: generationResponse.status });

            response.cookies.set({
                name: 'generation-count',
                value: String(count + 1),
                path: '/',
                maxAge: 60 * 60 * 24, // 24 hours
            });

            return response;
        }

    } catch (error) {
        console.error('Card generation API error:', error);
        if (error instanceof SyntaxError) {
            return NextResponse.json({ message: 'AI returned an invalid response format.' }, { status: 502 });
        }
        return NextResponse.json({ message: 'An unexpected error occurred on the server.' }, { status: 500 });
    }
}
