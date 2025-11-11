import { userData } from "@/mockup/mockup-data";

export default function GreetingWithUserName() {
    return (
        <h1 className="mb-12 text-[48px]! lg:text-[64px]!">
            Welcome back, {userData.name}!
        </h1>
    )
}