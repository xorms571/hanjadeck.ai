"use client";

import Image from "next/image"
import { useState } from "react";
import { userData } from "@/mockup/mockup-data"
import { currentCard } from "@/types/card"

export default function Card({ paramsId, currentCard }: { paramsId: string, currentCard: currentCard }) {

    const { progress } = userData //사용자 데이터에서 진행 상황 가져오기
    const { bookmark } = progress //북마크된 카드 ID 배열 가져오기
    
    const [isBookmarked, setIsBookmarked] = useState(bookmark.includes(paramsId)); //현재 카드가 북마크되었는지 여부 상태 관리

    const handleBookmarkToggle = () => {
        const newIsBookmarked = !isBookmarked; //북마크 상태 토글
        setIsBookmarked(newIsBookmarked); //상태 업데이트

        if (newIsBookmarked) { //북마크 추가
            if (!bookmark.includes(paramsId)) {
                bookmark.push(paramsId);
            }
        } else { //북마크 제거
            const index = bookmark.indexOf(paramsId);
            if (index > -1) {
                bookmark.splice(index, 1);
            }
        }
    }

    const imageSrc = isBookmarked ? "/bookmarked.svg" : "/unmarked.svg"
    const altText = isBookmarked ? "bookmarked card" : "unmarked card"

    return (
        <div className="w-full flex flex-col items-center gap-4 bg-(--secondary-white) px-8 py-6 rounded-[20px] shadow-lg">
            <div className="text-end w-full h-12">
                <button onClick={handleBookmarkToggle}>
                    <Image src={imageSrc} width={48} height={48} alt={altText} />
                </button>
            </div>
            <h1 className="text-[96px]">{currentCard.character}</h1>
            <h2>{currentCard.korean}</h2>
            <p>{currentCard.english}</p>
            <div className="w-full mt-6">
                <h4>Example Sentence</h4>
                <ul className="bg-(--neutrals-white) p-4 rounded-2xl mt-4">
                    {currentCard.examples.map((example, index) => (
                        <li className={`${index === 0 ? "mb-2.5" : ""}`} key={index}>{example}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}