import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import Generate from "./Generate";
import FlipCard from "../components/FlipCard";
import { getCards } from "@/lib/cards";
import Image from "next/image";

export default async function GeneratePage() {
    const user = await getCurrentUser();
    const cards = await getCards(user?.id);
    const exampleCard = cards.find(card => card.id === 'cmiaf6qg90000gaus0t6atdws') || cards[0];

    return (
        <main className="w-full py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                        Create Your Own Flashcard
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                        Enter a word, and let our AI handle the rest. Craft personalized flashcards to supercharge your learning.
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className="flex flex-col justify-center space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold">How it Works</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>
                                    <span className="font-semibold">Enter a Keyword:</span> Start by typing any Hanja character or a word you want to learn.
                                </li>
                                <li>
                                    <span className="font-semibold">AI-Powered Generation:</span> Our AI will instantly create a comprehensive flashcard with definitions, examples, and pronunciations.
                                </li>
                                <li>
                                    <span className="font-semibold">Review and Save:</span> Your new card is automatically saved to your deck. Review it anytime on the <Link href="/learn" className="text-(--primary) hover:underline">Learn Page</Link>.
                                </li>
                            </ul>
                        </div>
                        <div className="mt-6">
                            <Generate user={user} />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        {cards.length > 0 ? (
                            <FlipCard card={exampleCard} />
                        ) : (
                            <div className="relative w-full max-w-sm h-[400px] bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                                <Image src="/logo-lg.svg" alt="Hanja Deck Logo" width={100} height={100} className="opacity-20" />
                                <p className="absolute text-center text-gray-500 dark:text-gray-400">
                                    Your generated card will appear here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}