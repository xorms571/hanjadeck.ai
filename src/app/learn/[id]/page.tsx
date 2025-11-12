"use client";

import { useParams, useRouter } from "next/navigation";
import { CircleArrowIcon } from "./CircleArrowIcon";
import { mockupCards } from "@/mockup/mockup-data";
import Card from "./Card";
import Button from "@/app/components/Button";
import ProcessBar from "@/app/components/ProcessBar";

export default function CardPage() {

    const params = useParams();
    const router = useRouter();

    const total = mockupCards.length //전체 카드 갯수
    const paramsId = params.id; //현재 카드 ID

    if (typeof paramsId !== 'string') {
        console.error("Invalid paramsId:", paramsId); //유효하지 않은 paramsId 오류 처리
        return <div>Error: Invalid card ID.</div>;
    }

    const currentCardIndex = mockupCards.findIndex(card => card.id === paramsId); //현재 카드 인덱스

    if (currentCardIndex === -1) {
        console.error("Card not found for ID:", paramsId); //카드가 없을 때 오류 처리
        return <div>Error: Card not found.</div>;
    }

    const currentIndex = currentCardIndex + 1; //사용자에게 보여줄 현재 카드 번호
    const progressPercentage = (currentIndex / total) * 100; //진행률 백분율
    const currentCard = mockupCards[currentCardIndex]; //현재 카드 데이터

    const handlePrevious = () => { //이전 카드로 이동
        const prevIndex = (currentCardIndex - 1 + total) % total;
        const prevCardId = mockupCards[prevIndex].id;
        router.push(`/learn/${prevCardId}`);
    };

    const handleNext = () => { //다음 카드로 이동
        const nextIndex = (currentCardIndex + 1) % total;
        const nextCardId = mockupCards[nextIndex].id;
        router.push(`/learn/${nextCardId}`);
    }

    const baseButtonStyle = "leading-[72px] w-60! h-[72px] rounded-2xl! font-bold!"

    return (
        <div className="max-w-[796px] mx-auto">
            <ProcessBar background="secondary" number={progressPercentage} />
            <p className="text-end my-4">{`${currentIndex} of ${total}`}</p>
            <Card paramsId={paramsId} currentCard={currentCard} />
            <div className="max-w-[536px] mt-[72px] mx-auto flex gap-14">
                <Button
                    onClick={handlePrevious}
                    background="secondary"
                    className={`${baseButtonStyle} bg-(--secondary-cool)!`}
                    icon={<CircleArrowIcon />}>
                    Previous
                </Button>
                <Button
                    onClick={handleNext}
                    className={`${baseButtonStyle} flex-row-reverse!`}
                    icon={<CircleArrowIcon direction="right" color="#F8F8F8" />}>
                    Next
                </Button>
            </div>
        </div>
    )
}