'use client';
import { useState } from "react";
import Input from "../components/Input";
import { useRouter } from "next/navigation";
import { User } from "@/lib/auth";
import Button from "../components/Button";

export default function Generate({ user }: { user: User | null }) {

    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const userId = user?.id || null;

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/cards/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchTerm, userId }), // Include userId
            });

            const result = await response.json();

            if (response.status === 429) {
                alert('You have reached the maximum number of flashcard generations for today. Please try again tomorrow.');
                router.replace('/login');
            }

            if (!response.ok) {
                throw new Error(result.message || 'Failed to generate flashcard.');
            }

            // Generation successful, redirect to the new card page
            router.push(`/learn/${result.id}`);

        } catch (err: any) {
            setError(err.message);
            setIsLoading(false);
        }
    };
    return (
        <>
            <Input backgroundColor="bg-white" placeholder="Typing any word you want to learn" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <Button className="max-w-full!" onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate New Flashcard'}
            </Button>
            {error && (
                <p className="mt-4 w-3/4 text-red-500!">{error}</p>
            )}
        </>
    )
}