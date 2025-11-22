import Container from "./Container";
import TipSvg from "./TipSvg";

interface props {
    isFront: boolean;
    showTips: boolean;
    baseContainerStyle: string;
    character: string;
    korean: string;
    english: string;
    examples: string[];
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const CardFace = ({
    isFront,
    showTips,
    baseContainerStyle,
    character,
    korean,
    english,
    examples,
    handleClick
}: props) => {

    const highlightText = (text: string, highlightWord: string, className: string) => {
        if (!highlightWord) return <>{text}</>;
        // Use a regular expression to split the text, matching the highlightWord case-insensitively
        const parts = text.split(new RegExp(`(${highlightWord})`, 'gi'));
        return (
            <>
                {parts.map((part, i) =>
                    // Check if the current part matches the highlightWord (case-insensitively)
                    part.toLowerCase() === highlightWord.toLowerCase() ? (
                        <span key={i} className={className}>
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </>
        );
    };


    // Front일 때 opacity-0, Back은 표시
    const hidden = isFront ? "opacity-0" : "";

    return (
        <Container
            className={`${baseContainerStyle} justify-between ${!isFront ? "transform-[rotateY(180deg)]" : ""} overflow-hidden`}
            shadow
        >
            <button className={`${showTips && "text-white!"} z-50 mr-auto text-black hover:text-(--primary) cursor-pointer`} onClick={handleClick}>
                <TipSvg />
            </button>
            {/* Top */}
            {/*<div className="flex justify-between text-end w-full">
                <p className="text-gray-500! text-[14px]! md:text-[18px]!">
                    {createdAt.toLocaleString("en")}
                </p>

                {creatorName && (
                    <div className="hidden md:flex text-[18px] text-gray-500 h-[27px] gap-2 z-10">
                        Created by{" "}
                        <UserProfilePicture
                            imageUrl={creatorImage}
                            targetUserId={targetUserId}
                            size={27}
                        />
                        <div onClick={handleClick}>
                            <Link className="hover:underline" href={`/dashboard/${targetUserId}`}>
                                {creatorName}
                            </Link>
                        </div>
                    </div>
                )}
            </div>*/}

            {/* Middle */}
            <div className="text-center mt-10">
                <h1 className={character.length > 4 ? "text-[36px]!" : ""}>{character}</h1>
                <h2 className={`${character.length > 4 ? "text-[36px]!" : ""} ${hidden}`}>
                    {korean}
                </h2>
                <p className={hidden}>{english}</p>
            </div>

            {/* Bottom */}
            <div className="w-full mt-2.5 md:mt-5 text-sm md:text-base">
                <h4 className={`text-sm! md:text-[24px]! ${hidden}`}>Example Sentence</h4>

                <ul
                    className={`bg-(--neutrals-white) px-4 py-2 md:px-4 md:py-4 rounded-xl md:rounded-2xl mt-2 md:mt-4 ${hidden}`}
                >
                    {examples.map((example, index) => (
                        <li key={index} className={`${index === 0 ? "mb-1.5 md:mb-2.5" : ""}`}>
                            {index === 0 && korean ? highlightText(example, korean, "text-(--primary) font-bold")
                                : index === 1 && english ? highlightText(example, english, "text-(--primary) font-bold")
                                    : example}
                        </li>
                    ))}
                </ul>

                {/*{creatorName && (
                    <div className="flex mt-2 md:hidden text-[14px] text-gray-500 gap-2 z-10 items-end justify-end w-full">
                        Created by{" "}
                        <UserProfilePicture
                            imageUrl={creatorImage}
                            targetUserId={targetUserId}
                            size={18}
                        />
                        <div onClick={handleClick}>
                            <Link className="hover:underline" href={`/dashboard/${targetUserId}`}>
                                {creatorName}
                            </Link>
                        </div>
                    </div>
                )}*/}
            </div>

            <div className={`${showTips ? "flex" : "hidden"} absolute top-1/2 w-full h-full -translate-y-1/2 p-6 bg-black/50 text-white text-xs md:text-sm left-0 justify-between gap-10`}>
                <div className={`${isFront && "opacity-0"} flex flex-col justify-center items-start w-30`}>
                    <div className="w-5 h-7 rounded bg-white fade-left shadow" />
                    <b className="fade-left">👆</b>
                    <span>Swipe left<br /> if you’re still learning</span>
                </div>
                <div className={`${!isFront && "opacity-0"} text-center flex flex-col justify-center items-center`}>
                    <div className="flip-box bg-white! shadow animate-bounce" />
                    <b className="animate-bounce">👆</b>
                    <span>Tap to flip card</span>
                </div>
                <div className={`${isFront && "opacity-0"} flex flex-col justify-center items-end text-right w-30`}>
                    <div className="w-5 h-7 rounded bg-white fade-right shadow" />
                    <b className="fade-right">👆</b>
                    <span>Swipe right<br /> if you already know</span>
                </div>
            </div>
        </Container>
    );
};