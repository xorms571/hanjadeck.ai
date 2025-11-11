import Image from "next/image"

export default function LoginPage () {
    return (
        <div className="flex flex-col gap-6 justify-center items-center font-bold">
            <h3 className="text-[64px]">Hello there!</h3>
            <Image src="/login.svg" alt="Login Image" width={360} height={360} className="mb-7" />
            <button className="bg-(--primary) w-full max-w-[480px] h-[58px] text-white rounded-[180px]" >Get started</button>
            <span>or</span>
            <button className="bg-[#F8F8F8] w-full max-w-[480px] h-[58px] flex justify-center items-center gap-4 rounded-[180px]" ><Image src='/google.svg' width={24} height={24} alt="Google Sign In Icon" />Log in with Google</button>
        </div>
    )
}