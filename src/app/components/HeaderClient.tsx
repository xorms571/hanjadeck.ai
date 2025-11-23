"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { User } from "@/lib/auth";
import UserProfilePicture from "./UserProfilePicture";

export default function HeaderClient() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        // Close the mobile menu when the route changes
        setIsMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        // Fetch user data on the client side
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/auth/me');
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Failed to fetch user", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [pathname]); // Empty dependency array ensures this runs once on mount

    const isIntroPageThenHidden = pathname.includes('intro') && "hidden!";

    return (
        <header className={`${isMenuOpen?"":"backdrop-blur-md"} max-w-[1228px] m-auto z-152 flex justify-between items-center font-bold] p-6`}>
            <Link className="z-152" href='/intro'>
                <Image src='/logo-lg.svg' width={185} height={40} alt="logo" />
            </Link>

            {/* Hamburger Menu Button */}
            <button
                className={`${isIntroPageThenHidden} md:hidden z-152`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
            </button>

            {/* Navigation */}
            <nav className={`${isIntroPageThenHidden} ${isMenuOpen ? 'flex pt-26! pb-6! pl-6! pr-8! text-sm! md:text-lg! md:p-0!' : 'hidden'} w-full font-bold! items-end justify-end backdrop-blur-md z-151 flex-col-reverse absolute top-0 left-0 shadow rounded-b-lg gap-4 md:flex md:static md:flex-row md:bg-transparent md:shadow-none md:p-0 md:items-center md:gap-14`}>
                <Link href='/generate' className="text-right leading-7">Generate</Link>
                <Link href='/learn' className="text-right leading-7">Study</Link>
                
                {/* Auth buttons */}
                {!loading && !user && <Link href='/signup' className="text-right leading-7">Sign Up</Link>}
                {!loading && !user && <Link href='/login' className="text-right leading-7">Login</Link>}
                {!loading && user && <LogoutButton />}
                {!loading && user && <UserProfilePicture imageUrl={user.imageUrl} targetUserId={user.id} size={40} />}
            </nav>
        </header>
    )
}
