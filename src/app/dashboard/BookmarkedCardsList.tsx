import Link from 'next/link';
import { CardWithBookmarkStatus } from '@/lib/cards';
import Image from 'next/image';

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
    <ul className="grid grid-cols-1 gap-6">
      {bookmarkedCards.map((bookmark) => (
        <li className='flex items-center justify-between' key={bookmark.id}>
          <span className="text-lg mb-1 truncate max-w-30 md:max-w-none">{bookmark.character} {bookmark.korean}</span>
          <Link className='flex max-w-[92px] justify-between items-center' href={`/learn/${bookmark.id}`}>
            <span className='text-lg mb-1 mr-2'>Review</span>
            <Image width={20} height={20} src='/review.svg' alt='review icon' />
          </Link>
        </li>
      ))}
    </ul>
  );
}
