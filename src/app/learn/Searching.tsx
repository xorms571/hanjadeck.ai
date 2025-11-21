"use client";

import { useState, useRef, useEffect } from "react";
import Input from "@/app/components/Input";
import NoResult from "./NoResult";
import Link from "next/link";
import Container from "../components/Container";
import { CardWithBookmarkStatus } from "@/lib/cards";

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function Searching({ initialCards }: { initialCards: CardWithBookmarkStatus[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 100);

    const [cards, setCards] = useState<CardWithBookmarkStatus[]>(initialCards);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const search = async () => {
            if (debouncedSearchTerm) {
                setIsSearching(true);
                setIsLoading(true);
                setHasMore(false); // Disable infinite scroll during search
                const response = await fetch(`/api/cards/search?q=${debouncedSearchTerm}`);
                const searchedCards: CardWithBookmarkStatus[] = await response.json();
                setCards(searchedCards);
                setIsLoading(false);
            } else {
                setIsSearching(false);
                setCards(initialCards);
                setPage(2);
                setHasMore(true);
            }
        };
        search();
    }, [debouncedSearchTerm, initialCards]);

    const fetchMoreCards = async () => {
        if (isLoading || !hasMore || isSearching) return;
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
        {searchTerm.length > 0 && cards.length > 0 && <span className="absolute top-[180px] md:top-40 lg:top-[200px]">Results for {`"${searchTerm}"`}</span>}
        {searchTerm.length > 0 && cards.length === 0 && !isLoading ? (
            <NoResult searchTerm={searchTerm} />
        ) : (
            <>
                <ul className="flex flex-wrap gap-4">
                    {cards.map((card) => (
                        <li key={card.id} className="md:text-[32px] w-[calc(50%-8px)] lg:w-[calc(25%-12px)] h-40 md:h-[232px]">
                            <Container className="h-full font-bold shadow! rounded-[20px]! hover:bg-(--primary) hover:text-(--secondary-white) transition-colors">
                                <Link className="w-full h-full flex justify-center items-center text-center" href={`learn/${card.id}`}>
                                    {card.character}
                                </Link>
                            </Container>
                        </li>
                    ))}
                </ul>
                {hasMore && !isSearching && (
                    <div ref={loader} className="h-10" />
                )}
                {isLoading && (
                    <div className="text-center">Loading...</div>
                )}
            </>
        )}
    </>)
}