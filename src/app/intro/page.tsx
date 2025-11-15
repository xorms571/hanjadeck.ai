"use client"
import { mockupCards } from "@/mockup/mockup-data";
import { useRouter } from "next/navigation";
import FlipCard from "../components/FlipCard";
import SvgPathAnimationCSS from "../components/Path";
import Button from "../components/Button";

export default function IntroPage() {
    const router = useRouter()
    return (
        <>
            <div className="max-w-2xl w-fit flex items-center gap-12 flex-col m-auto mt-30 z-150 relative">
                <h2 className="text-center text-3xl! lg:text-5xl! leading-10 lg:leading-18">
                    Introducing <b className="text-(--primary)">hanjadeck.ai</b>,<br />
                    The fun way to learn<br />
                    vocabulary.
                </h2>
                <Button onClick={() => router.push('/learn')} className="h-13! md:h-[58px]! max-w-[200px]! md:max-w-[272px]!">Start Learning</Button>
            </div>
            <div className="w-full min-h-screen overflow-hidden top-0 absolute left-0">
                <div className="w-2xl fade-up0 opacity-0 absolute scale-30 lg:scale-50 rotate-4 -top-10 lg:top-10 -right-40 lg:right-0"><FlipCard currentCard={mockupCards[1]} /></div>
                <div className="w-2xl fade-up1 opacity-0 absolute scale-30 lg:scale-50 rotate-12 top-90 lg:top-130 -left-40 lg:left-0"><FlipCard currentCard={mockupCards[0]} /></div>
                <div className="w-2xl fade-up2 opacity-0 hidden lg:inline-block absolute scale-30 lg:scale-50 -rotate-8 top-130 left-1/2 -translate-x-1/2"><FlipCard currentCard={mockupCards[2]} /></div>
                <div className="w-2xl fade-up3 opacity-0 absolute scale-30 lg:scale-50 -rotate-6 top-90 lg:top-130 -right-40 lg:right-0"><FlipCard currentCard={mockupCards[3]} /></div>
                <div className="w-2xl fade-up4 opacity-0 absolute scale-30 lg:scale-50 -rotate-9 -top-10 lg:top-10 -left-40 lg:left-0"><FlipCard currentCard={mockupCards[4]} /></div>
                <SvgPathAnimationCSS strokeWidth={60} color="#7745D7" top="top-50 lg:top-80" />
                <SvgPathAnimationCSS strokeWidth={30} color="#E0E0E3" zIndex="-z-35" top="top-20 lg:top-30" className="rotate-175" transition={2.5} />
                <SvgPathAnimationCSS strokeWidth={10} color="#fff" zIndex="-z-10" top="top-40 lg:top-60" className="-rotate-180" transition={1.5} />
            </div>
        </>
    )
}