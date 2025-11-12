import Image from "next/image";
import Button from "../components/Button";

export default function NoResult({ searchTerm }: { searchTerm: string }) {
    return (
        <div className="flex justify-center flex-col items-center mt-[196px]">
            <Image src='/no-result.svg' alt="no result icon" width={120} height={120}/>
            <h4 className="mt-8 mb-4">{`"${searchTerm}" not found`}</h4>
            <p className="max-w-[453px] font-medium text-center mb-8">Would you like to generate this flashcard with AI? It will be automatically saved to your collection.</p>
            <Button>Generate New Flashcard</Button>
        </div>
    )
}