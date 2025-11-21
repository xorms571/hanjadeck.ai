import prisma from '@/lib/prisma';
import { Card, Prisma } from '@prisma/client';

// Define a new type that extends Card with bookmark status
export type CardWithBookmarkStatus = Card & {
    isBookmarked: boolean;
    creatorId?: string | null;
    creatorName?: string | null;
    creatorImage?: string | null;
};

export async function getTotalCardCount(): Promise<number> {
    try {
        const count = await prisma.card.count();
        return count;
    } catch (error) {
        console.error("Failed to get total card count:", error);
        return 0; // Return 0 on error
    }
}

export async function getCards(userId: string | undefined, page: number = 1, limit: number = 12): Promise<CardWithBookmarkStatus[]> {

    try {
        const cards = await prisma.card.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: [
                { createdAt: 'desc' },
                { id: 'asc' }
            ],
            include: {
                bookmarkedBy: userId ? {
                    where: { userId },
                    select: { userId: true } // Only need to know if a bookmark exists
                } : false,
            }
        });

        return cards.map(card => ({
            ...card,
            isBookmarked: card.bookmarkedBy ? card.bookmarkedBy.length > 0 : false,
        }));
    } catch (error) {
        console.error("Failed to get cards:", error);
        return []; // Return empty array on error
    }

}

export async function getAllCards(userId: string | undefined): Promise<CardWithBookmarkStatus[]> {
    try {
        const cards = await prisma.card.findMany({
            orderBy: [
                { createdAt: 'desc' },
                { id: 'asc' }
            ],
            include: {
                bookmarkedBy: userId ? {
                    where: { userId },
                    select: { userId: true } // Only need to know if a bookmark exists
                } : false,
            }
        });
        return cards.map(card => ({
            ...card,
            isBookmarked: card.bookmarkedBy ? card.bookmarkedBy.length > 0 : false,
        }));
    } catch (error) {
        console.error("Failed to get cards:", error);
        return []; // Return empty array on error
    }
}

export async function getCardById(id: string, userId: string | undefined): Promise<CardWithBookmarkStatus | null> {
    try {
        const card = await prisma.card.findUnique({
            where: { id },
            include: {
                bookmarkedBy: userId ? {
                    where: { userId },
                    select: { userId: true }
                } : false,
                interactions: {
                    orderBy: {
                        seenAt: 'asc',
                    },
                    take: 1,
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                imageUrl: true,
                            },
                        },
                    },
                },
            }
        });

        if (!card) {
            return null;
        }

        const creatorId = card.interactions.length > 0 ? card.interactions[0].user.id : null;
        const creatorName = card.interactions.length > 0 ? card.interactions[0].user.name : null;
        const creatorImage = card.interactions.length > 0 ? card.interactions[0].user.imageUrl : null;

        return {
            ...card,
            isBookmarked: card.bookmarkedBy ? card.bookmarkedBy.length > 0 : false,
            creatorId,
            creatorName,
            creatorImage
        };
    } catch (error) {
        console.error(`Failed to get card with ID ${id}:`, error);
        return null; // Return null on error or if not found
    }
}

export async function searchCards(userId: string | undefined, query: string): Promise<CardWithBookmarkStatus[]> {
    try {
        const cards = await prisma.card.findMany({
            where: {
                OR: [
                    { character: { contains: query, mode: 'insensitive' } },
                    { korean: { contains: query, mode: 'insensitive' } },
                    { english: { contains: query, mode: 'insensitive' } },
                ],
            },
            include: {
                bookmarkedBy: userId ? {
                    where: { userId },
                    select: { userId: true }
                } : false,
            }
        });

        return cards.map(card => ({
            ...card,
            isBookmarked: card.bookmarkedBy ? card.bookmarkedBy.length > 0 : false,
        }));
    } catch (error) {
        console.error("Failed to search cards:", error);
        return [];
    }
}

export async function getGeneratedCardsByUser(userId: string): Promise<Card[]> {
    if (!userId) {
        return [];
    }

    try {
        // Step 1: Find the cardIds of cards created by the user.
        // A card is considered "created" by the user if they have the first "seenAt" interaction with it.
        const results: { cardId: string }[] = await prisma.$queryRaw(
            Prisma.sql`
                SELECT T1."cardId"
                FROM "UserCardInteraction" AS T1
                INNER JOIN (
                    SELECT "cardId", MIN("seenAt") as min_seenAt
                    FROM "UserCardInteraction"
                    GROUP BY "cardId"
                ) AS T2 ON T1."cardId" = T2."cardId" AND T1."seenAt" = T2.min_seenAt
                WHERE T1."userId" = ${userId}
              `
        );

        const cardIds = results.map(result => result.cardId);

        if (cardIds.length === 0) {
            return [];
        }

        // Step 2: Fetch the full card data for the identified cardIds.
        const cards = await prisma.card.findMany({
            where: {
                id: {
                    in: cardIds,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return cards;
    } catch (error) {
        console.error("Failed to get generated cards by user:", error);
        return [];
    }
}
