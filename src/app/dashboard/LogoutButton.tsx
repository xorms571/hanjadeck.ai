"use client";

import { useRouter } from 'next/navigation';
import Button from '../components/Button';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
            router.refresh(); // To ensure the server-side state is cleared
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <Button onClick={handleLogout} className="mt-4">Log Out</Button>
    );
}
