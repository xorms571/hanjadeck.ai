"use client";

import Link from 'next/link';
import { CardWithBookmarkStatus } from '@/lib/cards';
import Image from 'next/image';
import { useState } from 'react';
import Button from '../components/Button';

interface BookmarkedCardsListProps {
  bookmarkedCards: CardWithBookmarkStatus[];
  isCurrentUserDashboard: boolean;
}

const ITEMS_PER_PAGE = 5;

export default function BookmarkedCardsList({ bookmarkedCards, isCurrentUserDashboard }: BookmarkedCardsListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  if (bookmarkedCards.length === 0) {
    return (
      <>
        {isCurrentUserDashboard ? <p>You haven't bookmarked any cards yet.</p> : <p>This user hasn't bookmarked any cards yet.</p>}
        {isCurrentUserDashboard && <Link href="/learn" className="text-primary hover:underline">Start learning!</Link>}
      </>
    );
  }

  const totalPages = Math.ceil(bookmarkedCards.length / ITEMS_PER_PAGE);
  const paginatedCards = bookmarkedCards.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 min-h-64">
        {paginatedCards.map((bookmark) => (
          <li className='flex h-8 items-center justify-between' key={bookmark.id}>
            <span className="text-lg mb-1 truncate max-w-30 md:max-w-none">{bookmark.character} {bookmark.korean}</span>
            <Link className='flex max-w-[92px] justify-between items-center' href={`/learn/${bookmark.id}`}>
              <span className='text-lg mb-1 mr-2'>Review</span>
              <Image width={20} height={20} src='/review.svg' alt='review icon' />
            </Link>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePrevPage}
            className='max-w-20! text-sm h-7!'
            disabled={currentPage === 1}>
            Previous
          </Button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            className='max-w-20! text-sm h-7!'
            disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      )}
    </>
  );
}
