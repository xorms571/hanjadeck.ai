"use client"
import { mockupCards } from "@/mockup/mockup-data";
import FlipCard from "../components/FlipCard";
import SvgPathAnimationCSS from "../components/Path";
import Button from "../components/Button";

export default function IntroPage() {
    return (
        <>
            <div className="max-w-2xl flex items-center gap-12 flex-col m-auto mt-30 z-150 relative">
                <h2 className="text-center">
                    Introducing <b className="text-(--primary)">hanjadeck.ai</b>,<br />
                    The <b className="text-[#007AFF]">fun</b> way to learn<br />
                    <b className="text-[#14AE5C]">vocabulary.</b>
                </h2>
                <Button className="max-w-[272px]!">Start Learning</Button>
            </div>
            <div className="w-full h-[850px] top-0 absolute left-0 -rotate-180">
                <div className="w-2xl fade-up0 absolute -scale-50 rotate-4 -top-1/3 right-1/12"><FlipCard currentCard={mockupCards[1]} /></div>
                <div className="w-2xl fade-up1 absolute -scale-50 rotate-12 -top-1/3 left-1/10"><FlipCard currentCard={mockupCards[0]} /></div>
                <div className="w-2xl fade-up2 absolute -scale-50 -rotate-8 -top-1/8 left-1/3"><FlipCard currentCard={mockupCards[2]} /></div>
                <div className="w-2xl fade-up3 absolute -scale-50 rotate-6 top-1/8 right-1/10"><FlipCard currentCard={mockupCards[3]} /></div>
                <div className="w-2xl fade-up4 absolute -scale-50 -rotate-9 top-1/8 left-1/11"><FlipCard currentCard={mockupCards[4]} /></div>
                <SvgPathAnimationCSS strokeWidth={60} color="#7745D7" top="-top-1/3" />
                <SvgPathAnimationCSS strokeWidth={30} color="#E0E0E3" zIndex="-z-35" top="-top-1/3" className="rotate-175" transition={2.5} />
                <SvgPathAnimationCSS strokeWidth={10} color="#fff" zIndex="-z-10" top="-top-1/2" className="-rotate-180" transition={1.5} />
            </div>
        </>
    )
}