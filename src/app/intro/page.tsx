"use client"
import { mockupCards } from "@/mockup/mockup-data";
import FlipCard from "../components/FlipCard";
import SvgPathAnimationCSS from "../components/Path";
import Button from "../components/Button";

export default function IntroPage() {
    return (
        <>
            <div className="max-w-2xl flex items-center gap-12 flex-col m-auto mt-10 lg:mt-40 z-150 relative">
                <h2 className="text-center">
                    Introducing <b className="text-(--primary)">hanjadeck.ai</b>,<br />
                    The fun way to learn<br />
                    vocabulary.
                </h2>
                <Button className="max-w-[272px]!">Start Learning</Button>
            </div>
            <div className="w-full min-h-screen overflow-hidden top-0 absolute left-0 -rotate-180">
                <div className="w-2xl fade-up0 opacity-0 absolute -scale-30 lg:-scale-50 rotate-4 bottom-1/12 right-1/12"><FlipCard currentCard={mockupCards[1]} /></div>
                <div className="w-2xl fade-up1 opacity-0 absolute -scale-30 lg:-scale-50 rotate-12 bottom-1/2 left-1/10"><FlipCard currentCard={mockupCards[0]} /></div>
                <div className="w-2xl fade-up2 opacity-0 hidden lg:inline-block absolute -scale-30 lg:-scale-50 -rotate-8 bottom-1/2 left-1/3"><FlipCard currentCard={mockupCards[2]} /></div>
                <div className="w-2xl fade-up3 opacity-0 absolute -scale-30 lg:-scale-50 rotate-6 bottom-1/2 right-1/10"><FlipCard currentCard={mockupCards[3]} /></div>
                <div className="w-2xl fade-up4 opacity-0 absolute -scale-30 lg:-scale-50 -rotate-9 bottom-1/12 left-1/11"><FlipCard currentCard={mockupCards[4]} /></div>
                <SvgPathAnimationCSS strokeWidth={60} color="#7745D7" top="bottom-1/12" />
                <SvgPathAnimationCSS strokeWidth={30} color="#E0E0E3" zIndex="-z-35" top="bottom-1/5" className="rotate-175" transition={2.5} />
                <SvgPathAnimationCSS strokeWidth={10} color="#fff" zIndex="-z-10" top="bottom-1/3" className="-rotate-180" transition={1.5} />
            </div>
        </>
    )
}