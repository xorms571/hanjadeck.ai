import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getCards } from '@/lib/cards';

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  
  const pageParam = searchParams.get('page');
  const limitParam = searchParams.get('limit');

  if (pageParam === null || limitParam === null) {
    return new NextResponse('Page and limit query parameters are required', { status: 400 });
  }
  
  const page = parseInt(pageParam, 10);
  const limit = parseInt(limitParam, 10);

  const cards = await getCards(user.id, page, limit);

  return NextResponse.json(cards);
}
