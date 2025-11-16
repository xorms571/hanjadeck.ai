import Container from '@/app/components/Container';
import Link from 'next/link';
import { CardWithBookmarkStatus } from '@/lib/cards';

interface BookmarkedCardsListProps {
  bookmarkedCards: CardWithBookmarkStatus[];
}

export default function BookmarkedCardsList({ bookmarkedCards }: BookmarkedCardsListProps) {
  if (bookmarkedCards.length === 0) {
    return (
      <>
        <p>You haven't bookmarked any cards yet.</p>
        <Link href="/learn" className="text-(--primary) hover:underline">Start learning!</Link>
      </>
    );
  }

  return (
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookmarkedCards.map((bookmark) => (
          <li key={bookmark.id}>
            <Link href={`/learn/${bookmark.id}`}>
              <Container className="flex items-center justify-between p-4 shadow! rounded-[10px]! hover:bg-gray-50">
                <span className="text-2xl font-bold">{bookmark.character}</span>
                <span className="text-lg text-gray-600">{bookmark.korean}</span>
              </Container>
            </Link>
          </li>
        ))}
      </ul>
  );
}
