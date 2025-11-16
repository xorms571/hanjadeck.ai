"use client";

import GreetingWithUserName from "./GreetingWithUserName";
import LogoutButton from "./LogoutButton";
import { User } from "@/lib/auth"; // Re-using the User type

export default function DashboardHeader({ user }: { user: User }) {
    return (
        <div className="flex justify-between items-start">
            <GreetingWithUserName name={user.name} />
            <LogoutButton />
        </div>
    );
}
