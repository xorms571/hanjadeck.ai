import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return(
        <header className="mb-12 flex justify-between items-center font-bold">
            <Link href='/'><Image src='/logo-lg.svg' width={185} height={40} alt="logo"/></Link>
            <nav className="flex items-center gap-14">
                <Link href='/dashboard'>Dashboard</Link>
                <Link href='/learn'>Study</Link>
                <Link href='/profile'><Image src='/login.svg' width={40} height={40} alt="profile image"/></Link>
            </nav>
        </header>
    )
}