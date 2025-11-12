"use client";

import React from "react";
import Input from "../components/Input";
import { mockupCards } from "@/mockup/mockup-data";

export default function Searching() {
    const [searchTerm, setSearchTerm] = React.useState('');
    return (<>
        <Input type="search" className="mb-[98px]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        {searchTerm.length > 0 && <span className="absolute top-[202px]">Results for {`"${searchTerm}"`}</span>}
        <ul className="flex flex-wrap gap-4">
            {mockupCards.filter(card => card.title.toLowerCase().includes(searchTerm.toLowerCase())).map((card) => (
                <li key={card.id} className="w-full md:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] bg-(--secondary-white) shadow flex justify-center items-center rounded-[20px] h-[232px]">
                    <h3 className="text-[32px]">{card.title}</h3>
                </li>
            ))}
        </ul>
    </>)
}