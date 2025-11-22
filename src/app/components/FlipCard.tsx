"use client";
import { useState, useEffect } from "react";
import { CardWithBookmarkStatus } from "@/lib/cards"; // Import the extended Card type
import { CardFace } from "./CardFace";
import TipSvg from "./TipSvg";

interface FlipCardProps {
    card: CardWithBookmarkStatus;
    onBookmarkToggle?: (cardId: string, isBookmarked: boolean) => Promise<boolean>; // Make optional and update return type
}

export default function FlipCard({ card, onBookmarkToggle }: FlipCardProps) {

    const [flipped, setFlipped] = useState(false); //카드 뒤집기 상태 관리
    const { character, korean, english, examples, id, createdAt, creatorId } = card; //현재 카드 데이터

    const [creatorName, setCreatorName] = useState<string | null>(null);
    const [creatorImage, setCreatorImage] = useState<string | null>(null);

    // Initialize isBookmarked state only if bookmarking is enabled
    // const [isBookmarked, setIsBookmarked] = useState(onBookmarkToggle ? card.isBookmarked : false);

    useEffect(() => {
        if (creatorId) {
            fetch(`/api/users/${creatorId}`)
                .then(res => res.json())
                .then(data => {
                    setCreatorName(data.name);
                    setCreatorImage(data.imageUrl);
                })
                .catch(err => console.error("Failed to fetch creator info:", err));
        }
    }, [creatorId]);

    {/*const handleBookmarkToggle = async (e: React.MouseEvent) => {
        e.stopPropagation(); //카드 뒤집기 이벤트 방지
        if (onBookmarkToggle) { // Only proceed if bookmarking is enabled
            const newIsBookmarked = !isBookmarked; //북마크 상태 토글
            const success = await onBookmarkToggle(id, newIsBookmarked); //부모 컴포넌트에 북마크 상태 변경 알림
            if (success) {
                setIsBookmarked(newIsBookmarked); //상태 업데이트
            }
        }
    }
    const imageSrc = isBookmarked ? "/bookmarked.svg" : "/unmarked.svg"
    const altText = isBookmarked ? "bookmarked card" : "unmarked card"*/}

    const baseContainerStyle = "w-full flex flex-col items-center px-4 py-3 md:px-6 md:py-6 absolute inset-0 backface-hidden rounded-[20px]! duration-100"

    const targetUserId = creatorId || undefined;

    const props = {
        baseContainerStyle,
        createdAt,
        creatorName,
        creatorImage,
        targetUserId,
        character,
        korean,
        english,
        examples,
    }

    const [showTips, setShowTips] = useState(false);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setShowTips(!showTips);
    };

    return (
        <div className="cardWrapper perspective-[1000px] w-full max-w-[796px] h-[calc(100vh-180px)] md:h-[515px]">
            <div
                className={`relative w-full h-full transition-transform duration-600 ease-[cubic-bezier(.2,.9,.2,1)] transform-3d ${flipped ? "transform-[rotateY(180deg)]" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => setFlipped(v => !v)}
                aria-pressed={flipped}
                onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") setFlipped(v => !v); }}
            >
                {/* Front Face */}
                <CardFace handleClick={handleClick} isFront={true} showTips={showTips} {...props} />

                {/* Back Face */}
                <CardFace handleClick={handleClick} isFront={false} showTips={showTips} {...props} />
            </div>
        </div>
    )
}