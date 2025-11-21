'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";

export default function NoResult({ searchTerm }: { searchTerm: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null); // Add userId state
    const router = useRouter();

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await fetch('/api/auth/me');
                if (response.ok) {
                    const user = await response.json();
                    setUserId(user.id);
                } else {
                    // Handle cases where user is not logged in or error occurs
                    console.error('Failed to fetch user ID');
                    setUserId(null); // Ensure userId is null if not logged in
                }
            } catch (err) {
                console.error('Error fetching user ID:', err);
                setUserId(null);
            }
        };
        fetchUserId();
    }, []); // Run once on component mount

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);

        // Ensure userId is available before attempting to generate
        if (!userId) {
            alert("You need to log in to generate flashcards.");
            router.push('/login');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/cards/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchTerm, userId }), // Include userId
            });

            const result = await response.json();

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
        <div className="flex justify-center flex-col items-center mt-[196px] text-center">
            <Image src='/no-result.svg' alt="no result icon" width={120} height={120}/>
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