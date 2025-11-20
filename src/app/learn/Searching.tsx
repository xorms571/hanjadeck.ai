"use client";

import { useState, useRef, useEffect } from "react";
import Input from "@/app/components/Input";
import NoResult from "./NoResult";
import Link from "next/link";
import Container from "../components/Container";
import { CardWithBookmarkStatus } from "@/lib/cards";

export default function Searching({ initialCards }: { initialCards: CardWithBookmarkStatus[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [cards, setCards] = useState<CardWithBookmarkStatus[]>(initialCards);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMoreCards = async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        const response = await fetch(`/api/cards?page=${page}&limit=12`);
        const newCards: CardWithBookmarkStatus[] = await response.json();

        if (newCards.length > 0) {
            setCards(prevCards => [...prevCards, ...newCards]);
            setPage(prevPage => prevPage + 1);
        } else {
            setHasMore(false);
        }
        setIsLoading(false);
    };

    const filteredCards = cards.filter(card => // Filter from the passed props
        card.korean.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.character.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.english.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const loader = useRef(null);

    useEffect(() => {
        if (!hasMore || isLoading) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    fetchMoreCards();
                }
            },
            { threshold: 1.0 }
        );

        const currentLoader = loader.current;
        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, [isLoading, hasMore]);

    return (<>
        <Input type="search" className="mb-[98px]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        {searchTerm.length > 0 && filteredCards.length > 0 && <span className="absolute top-[202px]">Results for {`"${searchTerm}"`}</span>}
        {searchTerm.length > 0 && filteredCards.length === 0 && !hasMore ? (
            <NoResult searchTerm={searchTerm} />
        ) : (
            <>
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
                {hasMore && (
                    <div ref={loader} className="h-10" />
                )}
                {isLoading && (
                    <div className="text-center">Loading...</div>
                )}
            </>
        )}
    </>)
}