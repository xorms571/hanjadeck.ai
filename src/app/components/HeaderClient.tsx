"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { User } from "@/lib/auth";
import UserProfilePicture from "./UserProfilePicture";

export default function HeaderClient({ user }: { user: User | null }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Close the mobile menu when the route changes
        setIsMenuOpen(false);
    }, [pathname]);

    const isIntroPageThenHidden = pathname.includes('intro') && "hidden!";
    const isUserLoggedInThenDashboardOrIntro = user ? "/dashboard" : "/login";

    return (
        <header className={`${isMenuOpen?"":"backdrop-blur-md"} w-full z-152 flex justify-between items-center font-bold fixed p-6`}>
            <Link className="z-152" href={isUserLoggedInThenDashboardOrIntro}>
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
            <nav className={`${isIntroPageThenHidden} ${isMenuOpen ? 'flex pt-26! pb-6! pl-6! pr-8! text-sm! md:text-lg! md:p-0!' : 'hidden'} w-full items-end justify-end backdrop-blur-md z-151 flex-col-reverse absolute top-0 left-0 shadow rounded-b-lg gap-4 md:flex md:static md:flex-row md:bg-transparent md:shadow-none md:p-0 md:items-center md:gap-14`}>
                <Link href='/learn' className="text-right leading-7">Study</Link>
                <Link href='/dashboard' className="text-right leading-7">Dashboard</Link>
                {!user && <Link href='/signup' className="text-right leading-7">Sign Up</Link>}
                {!user && <Link href='/login' className="text-right leading-7">Login</Link>}
                {user && <LogoutButton />}
                {user && <UserProfilePicture imageUrl={user.imageUrl} size={40} />}
            </nav>
        </header>
    )
}
