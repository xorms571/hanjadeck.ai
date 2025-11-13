"use client";
import { useState } from "react";
import { currentCard } from "@/types/card";
import { userData } from "@/mockup/mockup-data";
import Container from "@/app/components/Container";
import Image from "next/image";

export default function FlipCard({ currentCard }: { currentCard: currentCard }) {

    const { progress } = userData //사용자 데이터에서 진행 상황 가져오기
    const { bookmark } = progress //북마크된 카드 ID 배열 가져오기

    const [flipped, setFlipped] = useState(false); //카드 뒤집기 상태 관리
    const { character, korean, english, examples, id } = currentCard; //현재 카드 데이터
    const [isBookmarked, setIsBookmarked] = useState(bookmark.includes(id)); //현재 카드가 북마크되었는지 여부 상태 관리

    const handleBookmarkToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); //카드 뒤집기 이벤트 방지
        const newIsBookmarked = !isBookmarked; //북마크 상태 토글
        setIsBookmarked(newIsBookmarked); //상태 업데이트

        if (newIsBookmarked) { //북마크 추가
            if (!bookmark.includes(id)) {
                bookmark.push(id);
            }
        } else { //북마크 제거
            const index = bookmark.indexOf(id);
            if (index > -1) {
                bookmark.splice(index, 1);
            }
        }
    }
    const imageSrc = isBookmarked ? "/bookmarked.svg" : "/unmarked.svg"
    const altText = isBookmarked ? "bookmarked card" : "unmarked card"
    const baseContainerStyle = "w-full flex flex-col items-center px-4 py-3 md:px-6 md:py-6 absolute inset-0 backface-hidden rounded-[20px]! duration-100"

    return (
        <div className="perspective-[1000px] cursor-pointer w-full max-w-[796px] h-96 md:h-[515px]">
            <div
                className={`relative w-full h-full transition-transform duration-600 ease-[cubic-bezier(.2,.9,.2,1)] transform-3d ${flipped ? "transform-[rotateY(180deg)]" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => setFlipped(v => !v)}
                aria-pressed={flipped}
                onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") setFlipped(v => !v); }}
            >
                {/* Front Face */}
                <Container className={baseContainerStyle} shadow>
                    <div className="text-end w-full">
                        <button className="w-7 h-7 md:w-12 md:h-12 relative" onClick={(e) => handleBookmarkToggle(e)}>
                            <Image src={imageSrc} fill alt={altText} />
                        </button>
                    </div>
                    <h1 className="text-[96px] mt-1 md:mt-3">{character}</h1>
                </Container>

                {/* Back Face */}
                <Container className={`${baseContainerStyle} justify-between transform-[rotateY(180deg)]`} shadow>
                    <div className="text-end w-full">
                        <button className="w-7 h-7 md:w-12 md:h-12 relative" onClick={(e) => handleBookmarkToggle(e)}>
                            <Image src={imageSrc} fill alt={altText} />
                        </button>
                    </div>
                    <h1 className="text-[96px]">{character}</h1>
                    <h2>{korean}</h2>
                    <p>{english}</p>
                    <div className="w-full mt-2.5 md:mt-5 text-sm md:text-base">
                        <h4 className="text-sm! md:text-[24px]!">Example Sentence</h4>
                        <ul className="bg-(--neutrals-white) px-4 py-2 md:px-4 md:py-4 rounded-xl md:rounded-2xl mt-2 md:mt-4">
                            {examples.map((example, index) => (
                                <li className={`${index === 0 ? "mb-1.5 md:mb-2.5" : ""}`} key={index}>{example}</li>
                            ))}
                        </ul>
                    </div>
                </Container>
            </div>
        </div>
    )
}