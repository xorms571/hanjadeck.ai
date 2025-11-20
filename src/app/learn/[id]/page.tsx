import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getCardById, getTotalCardCount, getCards } from '@/lib/cards';
import CardDetailClient from './CardDetailClient';

export default async function CardDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; // Await params to unwrap it

    const user = await getCurrentUser();

    if (!id || typeof id !== 'string') {
        redirect('/learn'); // Redirect to the main learn page if ID is invalid
    }

    const card = await getCardById(id, user?.id);
    if (!card) {
        // Handle case where card is not found
        // Maybe redirect to /learn or a 404 page
        redirect('/learn'); // Redirect to the main learn page
    }

    const allCards = await getCards(user?.id); // Fetch all cards to get their IDs for navigation
    const allCardIds = allCards.map(c => c.id);
    const totalCards = await getTotalCardCount();

    return (
        <CardDetailClient user={user} card={card} totalCards={totalCards} allCardIds={allCardIds} />
    );
}