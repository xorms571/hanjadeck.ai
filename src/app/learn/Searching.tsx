"use client";

import { useState } from "react";
import { mockupCards } from "@/mockup/mockup-data";
import Input from "@/app/components/Input";
import NoResult from "./NoResult";
import Link from "next/link";
import Container from "../components/Container";

export default function Searching() {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredCards = mockupCards.filter(card => //검색어가 카드의 어떤 필드에 포함되는지 확인
        card.korean.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.character.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.english.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (<>
        <Input type="search" className="mb-[98px]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        {searchTerm.length > 0 && filteredCards.length > 0 && <span className="absolute top-[202px]">Results for {`"${searchTerm}"`}</span>}
        {searchTerm.length > 0 && filteredCards.length === 0 ? (
            <NoResult searchTerm={searchTerm} />
        ) : (
            <ul className="flex flex-wrap gap-4">
                {filteredCards.map((card) => (
                    <li key={card.id} className="text-[32px] w-full md:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] h-[232px]">
                        <Container className="h-full font-bold shadow! rounded-[20px]!">
                            <Link className="w-full h-full flex justify-center items-center" href={`learn/${card.id}`}>
                                {card.korean}
                            </Link>
                        </Container>
                    </li>
                ))}
            </ul>
        )}
    </>)
}