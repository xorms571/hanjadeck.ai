"use client";

import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import ProcessBar from "@/app/components/ProcessBar";
import FlipCard from "../../components/FlipCard";
import { CardWithBookmarkStatus } from "@/lib/cards"; // Import CardWithBookmarkStatus type
import Image from "next/image";

interface CardDetailClientProps {
    card: CardWithBookmarkStatus; // Use the extended type
    totalCards: number;
    allCardIds: string[]; // To handle navigation
}

export default function CardDetailClient({ card, totalCards, allCardIds }: CardDetailClientProps) {
    const router = useRouter();

    const currentCardIndex = allCardIds.findIndex(id => id === card.id);

    const currentIndex = currentCardIndex + 1; // User-facing current card number
    const progressPercentage = (currentIndex / totalCards) * 100;

    const api_toggleBookmark = async (cardId: string, bookmark: boolean, onUnauthorized: () => void): Promise<boolean> => {
        const method = bookmark ? 'POST' : 'DELETE';
        try {
            const response = await fetch(`/api/cards/${cardId}/bookmark`, {
                method: method,
            });

            if (response.ok) {
                return true;
            }

            if (response.status === 401) {
                onUnauthorized();
            } else {
                console.error('Failed to update bookmark status:', await response.text());
                alert('Failed to update bookmark status.');
            }
            return false;

        } catch (error) {
            console.error('Error updating bookmark status:', error);
            alert('An error occurred while updating bookmark status.');
            return false;
        }
    }

    const handleUnauthorizedForCardAction = () => {
        const hasShownConfirm = sessionStorage.getItem('hasShownLoginConfirm');
        if (!hasShownConfirm) {
            const confirmRedirect = confirm('You need to log in to save your progress. Would you like to go to the login page?');
            sessionStorage.setItem('hasShownLoginConfirm', 'true');
            if (confirmRedirect) {
                router.push('/login');
            }
        }
    };

    const handleUnauthorizedForBookmarkToggle = () => {
        const confirmRedirect = confirm('You need to log in to bookmark. Would you like to go to the login page?');
        if (confirmRedirect) {
            router.push('/login');
        }
    };

    const handleCardAction = async (known: boolean) => {
        let success = true;
        // Only call api_toggleBookmark if the bookmark status needs to change
        if (card.isBookmarked !== known) {
            success = await api_toggleBookmark(card.id, known, handleUnauthorizedForCardAction);
        }

        if (success) {
            // Record interaction
            try {
                await fetch('/api/users/me/interactions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cardId: card.id }),
                });
            } catch (error) {
                console.error('Error recording card interaction:', error);
                // Do not prevent navigation even if interaction recording fails
            }

            // Navigate to the next card
            const nextIndex = (currentCardIndex + 1) % totalCards;
            const nextCardId = allCardIds[nextIndex];
            router.push(`/learn/${nextCardId}`);
        }
    };

    const handlePrevious = () => {
        handleCardAction(true);
    };

    const handleNext = () => {
        handleCardAction(false);
    }

    const onBookmarkToggle = async (cardId: string, isBookmarked: boolean): Promise<boolean> => {
        const success = await api_toggleBookmark(cardId, isBookmarked, handleUnauthorizedForBookmarkToggle);
        if (success) {
            router.refresh();
        }
        return success;
    };

    const baseButtonStyle = "w-34! h-9! md:w-[240px]! md:h-[72px]! rounded-xl! md:rounded-2xl! font-bold! gap-2! md:gap-4!"

    return (
        <div className="max-w-md lg:max-w-[796px] mx-auto">
            <ProcessBar background="secondary" number={progressPercentage} />
            <p className="text-end my-4">{`${currentIndex} of ${totalCards}`}</p>
            <FlipCard card={card} onBookmarkToggle={onBookmarkToggle} /> {/* Pass card and onBookmarkToggle */}
            <div className="max-w-[536px] mt-[72px] mx-auto flex justify-between gap-5! md:gap-14!">
                <Button
                    onClick={handlePrevious}
                    background="secondary"
                    className={`${baseButtonStyle} bg-(--secondary-cool)!`}
                    icon={<div className="w-5 h-5 md:w-10 md:h-10 relative"><Image src='/x.svg' alt="unknown icon" fill/></div>}>
                    <p className="h-full leading-8 md:leading-[68px] text-(--neutrals-black)! text-sm! md:text-2xl!">Unknown</p>
                </Button>
                <Button
                    onClick={handleNext}
                    className={`${baseButtonStyle} flex-row-reverse! leading-[72px]`}
                    icon={<div className="w-5 h-5 md:w-10 md:h-10 relative"><Image src='/check.svg' alt="known icon" fill /></div>}>
                    <p className="h-full leading-8 md:leading-[68px] text-(--secondary-white)! text-sm! md:text-2xl!">Known</p>
                </Button>
            </div>
        </div>
    );
}
