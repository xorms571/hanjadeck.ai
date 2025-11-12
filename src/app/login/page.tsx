import Image from "next/image"
import Button from "@/app/components/Button"

export default function LoginPage() {
    return (
        <div className="flex flex-col gap-6 justify-center items-center font-bold">
            <h3 className="lg:text-[64px]!">Hello there!</h3>
            <Image src="/login.svg" alt="Login Image" width={360} height={360} className="mb-7" />
            <Button shadow>Get started</Button>
            <span>or</span>
            <Button
                background="secondary" shadow
                icon={<Image src='/google.svg' width={24} height={24} alt="Google Sign In Icon" />}>
                Log in with Google
            </Button>
        </div>
    )
}