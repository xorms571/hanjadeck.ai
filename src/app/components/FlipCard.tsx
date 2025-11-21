"use client";
import { useState, useEffect } from "react";
import { CardWithBookmarkStatus } from "@/lib/cards"; // Import the extended Card type
import Container from "@/app/components/Container";
import UserProfilePicture from "./UserProfilePicture";
import Link from "next/link";

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
    const [isBookmarked, setIsBookmarked] = useState(onBookmarkToggle ? card.isBookmarked : false);

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

    const highlightText = (text: string, highlightWord: string, className: string) => {
        if (!highlightWord) return <>{text}</>;
        // Use a regular expression to split the text, matching the highlightWord case-insensitively
        const parts = text.split(new RegExp(`(${highlightWord})`, 'gi'));
        return (
            <>
                {parts.map((part, i) =>
                    // Check if the current part matches the highlightWord (case-insensitively)
                    part.toLowerCase() === highlightWord.toLowerCase() ? (
                        <span key={i} className={className}>
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </>
        );
    };

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

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div className="perspective-[1000px] w-full max-w-[796px] h-[calc(100vh-180px)] md:h-[515px]">
            <div
                className={`relative w-full h-full transition-transform duration-600 ease-[cubic-bezier(.2,.9,.2,1)] transform-3d ${flipped ? "transform-[rotateY(180deg)]" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => setFlipped(v => !v)}
                aria-pressed={flipped}
                onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") setFlipped(v => !v); }}
            >
                {/* Front Face */}
                <Container className={`${baseContainerStyle} justify-between`} shadow>
                    <div className="flex justify-between text-end w-full">
                        {/*onBookmarkToggle && ( // Conditionally render button
                            <button className="w-7 h-7 md:w-12 md:h-12 relative" onClick={(e) => handleBookmarkToggle(e)}>
                                <Image src={imageSrc} fill alt={altText} />
                            </button>
                        )*/}
                        <p>{createdAt.toLocaleString("en")}</p>
                        {creatorName && <div className="text-[18px] text-gray-500 h-[27px] flex gap-2 z-10">
                            Created by <UserProfilePicture imageUrl={creatorImage} targetUserId={targetUserId} size={27} /> <div onClick={handleClick}><Link className="hover:underline" href={`/dashboard/${targetUserId}`}>{creatorName}</Link></div>
                        </div>}
                    </div>
                    <div className="text-center">
                        <h1 className={character.length > 4 ? "text-[36px]!" : ""}>{character}</h1>
                        <h2 className={`${character.length > 4 ? "text-[36px]!" : ""} opacity-0`}>{korean}</h2>
                        <p className="opacity-0">{english}</p>
                    </div>
                    <div className="w-full mt-2.5 md:mt-5 text-sm md:text-base opacity-0">
                        <h4 className="text-sm! md:text-[24px]!">Example Sentence</h4>
                        <ul className="bg-(--neutrals-white)  px-4 py-2 md:px-4 md:py-4 rounded-xl md:rounded-2xl mt-2 md:mt-4">
                            {examples.map((example: string, index: number) => (
                                <li className={`${index === 0 ? "mb-1.5 md:mb-2.5" : ""}`} key={index}>
                                    {index === 0 && korean
                                        ? highlightText(example, korean, "text-(--primary) font-bold")
                                        : index === 1 && english
                                            ? highlightText(example, english, "text-(--primary) font-bold")
                                            : example}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Container>

                {/* Back Face */}
                <Container className={`${baseContainerStyle} justify-between transform-[rotateY(180deg)]`} shadow>
                    <div className="flex justify-between items-center text-end w-full">
                        {/*onBookmarkToggle && ( // Conditionally render button
                            <button className="w-7 h-7 md:w-12 md:h-12 relative" onClick={(e) => handleBookmarkToggle(e)}>
                                <Image src={imageSrc} fill alt={altText} />
                            </button>
                        )*/}
                        <p>{createdAt.toLocaleString("en")}</p>
                        {creatorName && <div className="text-[18px] text-gray-500 h-[27px] flex gap-2 z-10">
                            Created by <UserProfilePicture imageUrl={creatorImage} targetUserId={targetUserId} size={27} /> <div onClick={handleClick}><Link className="hover:underline" href={`/dashboard/${targetUserId}`}>{creatorName}</Link></div>
                        </div>}
                    </div>
                    <div className="text-center">
                        <h1 className={character.length > 4 ? "text-[36px]!" : ""}>{character}</h1>
                        <h2 className={character.length > 4 ? "text-[36px]!" : ""}>{korean}</h2>
                        <p>{english}</p>
                    </div>
                    <div className="w-full mt-2.5 md:mt-5 text-sm md:text-base">
                        <h4 className="text-sm! md:text-[24px]!">Example Sentence</h4>
                        <ul className="bg-(--neutrals-white) px-4 py-2 md:px-4 md:py-4 rounded-xl md:rounded-2xl mt-2 md:mt-4">
                            {examples.map((example: string, index: number) => (
                                <li className={`${index === 0 ? "mb-1.5 md:mb-2.5" : ""}`} key={index}>
                                    {index === 0 && korean
                                        ? highlightText(example, korean, "text-(--primary) font-bold")
                                        : index === 1 && english
                                            ? highlightText(example, english, "text-(--primary) font-bold")
                                            : example}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Container>
            </div>
        </div>
    )
}