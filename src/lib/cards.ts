import prisma from '@/lib/prisma';
import { Card } from '@prisma/client';

export async function getTotalCardCount(): Promise<number> {
    try {
        const count = await prisma.card.count();
        return count;
    } catch (error) {
        console.error("Failed to get total card count:", error);
        return 0; // Return 0 on error
    }
}

export async function getCards(): Promise<Card[]> {
    try {
        const cards = await prisma.card.findMany({
            orderBy: {
                createdAt: 'asc',
            },
        });
        return cards;
    } catch (error) {
        console.error("Failed to get cards:", error);
        return []; // Return empty array on error
    }
}

export async function getCardById(id: string): Promise<Card | null> {
    try {
        const card = await prisma.card.findUnique({
            where: { id },
        });
        return card;
    } catch (error) {
        console.error(`Failed to get card with ID ${id}:`, error);
        return null; // Return null on error or if not found
    }
}
