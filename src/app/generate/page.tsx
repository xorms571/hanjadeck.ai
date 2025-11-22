import Link from "next/link";
import Container from "../components/Container";
import { getCurrentUser } from "@/lib/auth";
import Generate from "./Generate";
import FlipCard from "../components/FlipCard";
import { getCards } from "@/lib/cards";

export default async function GeneratePage() {
    const user = await getCurrentUser();
    const cards = await getCards(user?.id);
    return (
        <div className="flex flex-col gap-5 my-10">
            <h2 className="mb-6 text-[28px]! lg:text-[64px]!">Generate a flashcard</h2>
            <div className="flex flex-col md:flex-row gap-10">
                <div className="md:w-2/3"><FlipCard card={cards[0]} /></div>
                <div className="flex flex-col gap-5 md:w-1/2">
                    <p>The site integrates flashcard generation directly into the learning experience.</p>
                    <p>Instead of creating cards separately, you’ll need to go to the <Link href='/learn' className="text-(--primary) hover:underline">Learn page</Link> on that site. While studying, you can generate new flashcards dynamically.</p>
                    <p>The “Generate New Flashcard” option is available, but it’s tied to the study workflow rather than a standalone generator.</p>
                    <Generate user={user} />
                </div>
            </div>
        </div>
    )
}