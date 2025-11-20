export default function LearningTip({learningTipHandler}:{learningTipHandler: () => void}) {
    return (
        <div onClick={learningTipHandler} className="absolute top-0 left-0 w-full h-screen bg-black/80 text-white flex flex-col gap-10 justify-center items-center md:hidden text-xs">
            <div className="flex justify-between gap-10 mt-40">
                <div className="flex flex-col justify-start items-start w-18">
                    <div className="w-5 h-7 rounded bg-white fade-left" />
                    <b className="fade-left">👆</b>
                    <span>drag to left<br /> if unknown</span>
                </div>
                <div className="flex flex-col justify-end items-end text-right w-18">
                    <div className="w-5 h-7 rounded bg-white fade-right" />
                    <b className="fade-right">👆</b>
                    <span>drag to right<br /> if known</span>
                </div>
            </div>
            <div className="text-center flex flex-col items-center">
                <div className="flip-box animate-bounce" />
                <b className="animate-bounce">👆</b>
                <span>tap the card<br /> for flip the card</span>
            </div>
        </div>
    )
}