"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Button from "@/app/components/Button";
import ProcessBar from "@/app/components/ProcessBar";
import FlipCard from "../../components/FlipCard";
import { CardWithBookmarkStatus } from "@/lib/cards";
import { User } from "@/lib/auth";
import Image from "next/image";
import Input from "@/app/components/Input";
import Container from "@/app/components/Container";
import LearningTip from "./LearningTip";

interface props {
    card: CardWithBookmarkStatus;
    totalCards: number;
    allCardIds: string[];
    user: User | null;
}

export default function CardDetailClient({ card, totalCards, allCardIds, user }: props) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [editedCard, setEditedCard] = useState(card);
    const [isLoading, setIsLoading] = useState(false);
    const [showLearningTip, setShowLearningTip] = useState(false);

    const cardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hasSeen = sessionStorage.getItem('learningTip');
            if (!hasSeen) {
                setShowLearningTip(true);
            }
        }
    }, []);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);

    const threshold = 50; // 일정 거리 이상이면 완전히 날아가게

    const getClientX = (e: React.MouseEvent | React.TouchEvent): number => {
        return "touches" in e ? e.touches[0].clientX : e.clientX;
    };

    const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        const clientX = getClientX(e);
        setIsDragging(true);
        setStartX(clientX);

        if (cardRef.current) {
            cardRef.current.style.transition = "none";
        }
    };

    const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging || !cardRef.current) return;

        const clientX = getClientX(e);
        const delta = clientX - startX;
        setCurrentX(delta);

        // 실시간 이동
        cardRef.current.style.transform = `translateX(${delta}px)`;
    };

    const onDragEnd = () => {
        if (!cardRef.current) return;

        setIsDragging(false);

        // 오른쪽으로 크게 드래그 → 화면 밖으로 날리기
        if (currentX > threshold) {
            cardRef.current.style.transition = "0.3s ease-out";
            cardRef.current.style.transform = "translateX(1500px)"; // 화면 오른쪽 끝
            handleKnown();
        }
        // 왼쪽으로 크게 드래그 → 화면 밖으로 날리기
        else if (currentX < -threshold) {
            cardRef.current.style.transition = "0.3s ease-out";
            cardRef.current.style.transform = "translateX(-1500px)"; // 화면 왼쪽 끝
            handleUnknown();
        }
        // threshold 미만 → 원래 자리로 복귀
        else {
            cardRef.current.style.transition = "0.25s ease-out";
            cardRef.current.style.transform = "translateX(0px)";
            console.log("🔙 원래 자리로 복귀");
        }

        setCurrentX(0);
    };

    useEffect(() => {
        setEditedCard(card);
    }, [card]);

    const currentCardIndex = allCardIds.findIndex(id => id === card.id);
    const currentIndex = currentCardIndex + 1;
    const progressPercentage = (currentIndex / totalCards) * 100;

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedCard(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/cards/${card.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedCard),
            });

            if (!response.ok) {
                throw new Error('Failed to save card');
            }

            setIsEditing(false);
            router.refresh(); // Refresh the page to show the updated card data
        } catch (error) {
            console.error(error);
            alert('Error saving card. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedCard(card); // Reset changes
    };

    const api_toggleBookmark = async (cardId: string, bookmark: boolean, onUnauthorized: () => void): Promise<boolean> => {
        // ... (existing implementation)
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
        // ... (existing implementation)
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
        // ... (existing implementation)
        const confirmRedirect = confirm('You need to log in to bookmark. Would you like to go to the login page?');
        if (confirmRedirect) {
            router.push('/login');
        }
    };

    const handleCardAction = (known: boolean) => {
        // Navigate to the next card immediately
        const nextIndex = (currentCardIndex + 1) % totalCards;
        const nextCardId = allCardIds[nextIndex];
        router.push(`/learn/${nextCardId}`);

        // Run API calls in the background without awaiting
        (async () => {
            try {
                let bookmarkSuccess = true;
                if (card.isBookmarked !== known) {
                    // We don't await here, but we can check the result if needed
                    // for sequential background tasks.
                    bookmarkSuccess = await api_toggleBookmark(card.id, known, handleUnauthorizedForCardAction);
                }

                if (bookmarkSuccess) {
                    await fetch('/api/users/me/interactions', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ cardId: card.id }),
                    });
                }
            } catch (error) {
                console.error('Error in background card action:', error);
            }
        })();
    };

    const handleUnknown = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transition = "0.3s ease-out";
        cardRef.current.style.transform = "translateX(-1500px)"; // 화면 왼쪽 끝
        handleCardAction(true);
    };

    const handleKnown = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transition = "0.3s ease-out";
        cardRef.current.style.transform = "translateX(1500px)"; // 화면 오른쪽 끝
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

    const learningTipHandler = () => {
        sessionStorage.setItem('learningTip', 'true');
        setShowLearningTip(false);
    }

    return (
        <div className="max-w-md lg:max-w-[796px] mx-auto">
            <ProcessBar background="secondary" number={progressPercentage} />
            <div className="flex justify-between items-center">
                <div className="flex">
                    {user?.role === 'ADMIN' && (
                        <Button onClick={handleEditToggle} background="secondary" className="h-7! mr-2 w-16! max-w-16! text-sm">
                            {isEditing ? 'Cancel' : 'Edit'}
                        </Button>
                    )}
                    <Button onClick={() => router.push('/learn')} className="h-7! max-w-16! w-16! text-sm">
                        Back
                    </Button>
                </div>
                <p className="text-end my-4">{`${currentIndex} of ${totalCards}`}</p>
            </div>

            <div className="relative">
                <div
                    ref={cardRef}
                    onMouseDown={onDragStart}
                    onMouseMove={onDragMove}
                    onMouseUp={onDragEnd}
                    onMouseLeave={isDragging ? onDragEnd : undefined}
                    onTouchStart={onDragStart}
                    onTouchMove={onDragMove}
                    onTouchEnd={onDragEnd}
                    style={{
                        cursor: "grab",
                        touchAction: "none", // 모바일에서 드래그 방해 제거
                        userSelect: "none",
                    }}>
                    {isEditing ? (
                        <Container>
                            <Input label="character" name="character" value={editedCard.character} onChange={handleInputChange} />
                            <Input label="korean" name="korean" value={editedCard.korean} onChange={handleInputChange} />
                            <Input label="english" name="english" value={editedCard.english} onChange={handleInputChange} />
                            <div>
                                <label htmlFor="examples" className="inline-block text-[16px] md:text-[22px] mb-2 font-medium">examples</label>
                                <textarea
                                    id="examples"
                                    name="examples"
                                    value={editedCard.examples.join('\n')}
                                    onChange={handleInputChange}
                                    className="w-full text-[16px] md:text-[22px] text-[#7A7A7A] border-(--secondary-cool) rounded-4xl p-4 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={5}
                                />
                            </div>
                            <div className="flex gap-4 mt-4">
                                <Button onClick={handleSave} disabled={isLoading} className="w-full">
                                    {isLoading ? 'Saving...' : 'Save'}
                                </Button>
                                <Button onClick={handleCancel} background="secondary" className="w-full">
                                    Cancel
                                </Button>
                            </div>
                        </Container>
                    ) : (
                        <FlipCard card={card} onBookmarkToggle={onBookmarkToggle} />
                    )}
                </div>
                <Container className={`-z-10 h-[calc(100vh-280px)] md:h-[515px] absolute top-0 bg-(--primary)/20! shadow-inner flex justify-center items-center w-full`}>
                    <Image className="opacity-50" src="/logo-lg.svg" alt="logo icon" width={150} height={150} />
                </Container>
            </div>
            {/*{showLearningTip && <LearningTip learningTipHandler={learningTipHandler} />}*/}
            <div className="max-w-[536px] mt-5 md:mt-[72px] mx-auto flex justify-between gap-5! md:gap-14!">
                <Button
                    onClick={handleUnknown}
                    background="secondary"
                    className={`${baseButtonStyle} bg-(--secondary-cool)! hover:bg-(--secondary-cool-hover)!`}
                    icon={<div className="w-5 h-5 md:w-10 md:h-10 relative"><Image src='/x.svg' alt="unknown icon" fill /></div>}>
                    <p className="h-full leading-8 md:leading-[68px] text-(--neutrals-black)! text-sm! md:text-2xl!">Unknown</p>
                </Button>
                <Button
                    onClick={handleKnown}
                    className={`${baseButtonStyle} flex-row-reverse! leading-[72px]`}
                    icon={<div className="w-5 h-5 md:w-10 md:h-10 relative"><Image src='/check.svg' alt="known icon" fill /></div>}>
                    <p className="h-full leading-8 md:leading-[68px] text-(--secondary-white)! text-sm! md:text-2xl!">Known</p>
                </Button>
            </div>
        </div>
    );
}
