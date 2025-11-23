'use client';

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";

export default function NoResult({ searchTerm }: { searchTerm: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/cards/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchTerm }),
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
        <div className="flex justify-center flex-col items-center mb-30 md:mb-0 md:mt-[196px] text-center">
            <Image src='/no-result.svg' alt="no result icon" width={120} height={120} />
            <h4 className="mt-8 mb-4">{`"${searchTerm}" not found`}</h4>
            <p className="max-w-[453px] font-medium text-center mb-8">Would you like to generate this flashcard with AI? It will be automatically saved to your collection.</p>
            <Button onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate New Flashcard'}
            </Button>
            {error && (
                <p className="mt-4 w-3/4 text-red-500!">{error}</p>
            )}
        </div>
    );
}