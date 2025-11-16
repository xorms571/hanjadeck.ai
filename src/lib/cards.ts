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
