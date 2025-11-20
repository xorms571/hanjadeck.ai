import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { searchCards } from '@/lib/cards';

export async function GET(request: NextRequest) {
    const user = await getCurrentUser();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json([]);
    }

    const cards = await searchCards(user?.id, query);

    return NextResponse.json(cards);
}
