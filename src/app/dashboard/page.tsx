"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Container from "@/app/components/Container";
import ProgressOverview from "./ProgressOverview";
import GreetingWithUserName from "./GreetingWithUserName";
import UserProfilePicture from "./UserProfilePicture";
import OverallProgress from "./OverallProgress";
import Button from '../components/Button';

// Define a type for the user data for better type safety
type User = {
    id: string;
    name: string;
    email: string;
    imageUrl: string | null;
    // Add other user properties as needed
};

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/auth/me');
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    // Not authenticated, redirect to login
                    router.push('/login');
                }
            } catch (error) {
                console.error("Failed to fetch user", error);
                // Redirect to login on error as well
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (!user) {
        // This is a fallback, as the useEffect should have already redirected.
        return null;
    }

    return (
        <div className="max-w-[630px] lg:max-w-max mx-auto">
            <div className="flex justify-between items-start">
                <GreetingWithUserName name={user.name} />
                <Button onClick={handleLogout} className="mt-4">Log Out</Button>
            </div>
            <div className="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-6">
                <div>
                    <Image src='/dashboard.svg' width={630} height={393} alt="dashboard image" />
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <ProgressOverview />
                    </ul>
                </div>
                <Container className="flex flex-col items-center gap-8" shadow>
                    <UserProfilePicture imageUrl={user.imageUrl} />
                    <Container className="border-[#D9D9D9] border flex flex-col gap-4">
                        <h3>Overall Progress</h3>
                        <OverallProgress />
                    </Container>
                </Container >
            </div>
        </div>
    )
}