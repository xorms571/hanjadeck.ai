"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Close the mobile menu when the route changes
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <header className="mb-12 z-152 flex justify-between items-center font-bold">
            <Link className="z-152" href='/'>
                <Image src='/logo-lg.svg' width={185} height={40} alt="logo"/>
            </Link>

            {/* Hamburger Menu Button */}
            <button
                className="md:hidden z-152"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
            </button>

            {/* Navigation */}
            <nav className={`${isMenuOpen ? 'flex pt-26! pb-6! pl-6! pr-8! text-sm! md:text-lg! md:p-0!' : 'hidden'} backdrop-blur-md z-151 flex-col-reverse absolute top-0 left-0 w-full shadow rounded-b-lg items-end gap-4 md:flex md:static md:flex-row md:w-auto md:bg-transparent md:shadow-none md:p-0 md:items-center md:gap-14`}>
                <Link href='/dashboard' className="w-full text-right md:w-auto leading-7">Dashboard</Link>
                <Link href='/signup' className="w-full text-right md:w-auto leading-7">Sign Up</Link>
                <Link href='/learn' className="w-full text-right md:w-auto leading-7">Study</Link>
                <Link href='/profile' className="w-full flex justify-end md:w-auto">
                    <Image src='/login.svg' width={40} height={40} alt="profile image"/>
                </Link>
            </nav>
        </header>
    )
}