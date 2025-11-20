import prisma from '@/lib/prisma';
import { Card } from '@prisma/client';

// Define a new type that extends Card with bookmark status
export type CardWithBookmarkStatus = Card & {
    isBookmarked: boolean;
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
            }
        });

        if (!card) {
            return null;
        }

        return {
            ...card,
            isBookmarked: card.bookmarkedBy ? card.bookmarkedBy.length > 0 : false,
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