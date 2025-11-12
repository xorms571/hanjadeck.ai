import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";

interface props {
    character: string
    korean: string
    english: string
    width: string
    height: string
    id: string
}

export default function FlipCard({ id, character, korean, english, width, height }: props) {

    const [flipped, setFlipped] = useState(false);
    const router = useRouter();

    const handleDetailClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`learn/${id}`);
    }

    return (
        <div style={{ width, height }} className="perspective-[1000px] cursor-pointer">
            <div
                className={`relative w-full h-full transition-transform duration-600 ease-[cubic-bezier(.2,.9,.2,1)] transform-3d ${flipped ? "transform-[rotateY(180deg)]" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => setFlipped(v => !v)}
                aria-pressed={flipped}
                onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") setFlipped(v => !v); }}
            >
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center backface-hidden rounded-xl shadow bg-(--secondary-white) hover:bg-(--secondary-cool) transition-colors duration-100">
                    {character}
                    <Button
                        className="text-sm w-16! h-6! leading-6 absolute bottom-3 right-3"
                        onClick={(e) => handleDetailClick(e)}>
                        Detail
                    </Button>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center backface-hidden rounded-xl shadow bg-(--primary) hover:bg-(--primary-hover) transform-[rotateY(180deg)] transition-colors duration-100">
                    <p className="text-[32px]! text-(--secondary-white)!">{korean}</p>
                    <p className="absolute bottom-[30%] text-md text-(--secondary-white)!">{english}</p>
                    <Button
                        background="secondary"
                        className="text-sm w-16! h-6! leading-6 absolute bottom-3 right-3"
                        onClick={(e) => handleDetailClick(e)}>
                        Detail
                    </Button>
                </div>

            </div>
        </div>
    )
}