"use client";

import { useRouter } from "next/navigation";
import { CircleArrowIcon } from "./CircleArrowIcon";
import Button from "@/app/components/Button";
import ProcessBar from "@/app/components/ProcessBar";
import FlipCard from "../../components/FlipCard";
import { CardWithBookmarkStatus } from "@/lib/cards"; // Import CardWithBookmarkStatus type

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

    const handlePrevious = () => {
        const prevIndex = (currentCardIndex - 1 + totalCards) % totalCards;
        const prevCardId = allCardIds[prevIndex];
        router.push(`/learn/${prevCardId}`);
    };

    const handleNext = () => {
        const nextIndex = (currentCardIndex + 1) % totalCards;
        const nextCardId = allCardIds[nextIndex];
        router.push(`/learn/${nextCardId}`);
    }

    const onBookmarkToggle = async (cardId: string, isBookmarked: boolean): Promise<boolean> => {
        const method = isBookmarked ? 'POST' : 'DELETE';
        try {
            const response = await fetch(`/api/cards/${cardId}/bookmark`, {
                method: method,
            });
            if (response.ok) {
                router.refresh(); // Re-fetch server data to update UI
                return true; // Indicate success
            } else {
                if (response.status === 401) {
                    const confirmRedirect = confirm('You need to log in to bookmark. Would you like to go to the login page?');
                    if (confirmRedirect) {
                        router.push('/login');
                    }
                    return false; // Indicate failure (even if redirect is confirmed, the bookmark action itself failed)
                }
                console.error('Failed to toggle bookmark:', await response.text());
                alert('Failed to update bookmark status.');
                return false; // Indicate failure
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error);
            alert('An error occurred while updating bookmark status.');
            return false; // Indicate failure
        }
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
                    icon={<div className="w-5 h-5 md:w-10 md:h-10"><CircleArrowIcon /></div>}>
                    <p className="h-full leading-8 md:leading-[68px] text-(--neutrals-black)! text-sm! md:text-2xl!">Previous</p>
                </Button>
                <Button
                    onClick={handleNext}
                    className={`${baseButtonStyle} flex-row-reverse! leading-[72px]`}
                    icon={<div className="w-5 h-5 md:w-10 md:h-10"><CircleArrowIcon direction="right" color="#F8F8F8" /></div>}>
                    <p className="h-full leading-8 md:leading-[68px] text-(--secondary-white)! text-sm! md:text-2xl!">Next</p>
                </Button>
            </div>
        </div>
    );
}
