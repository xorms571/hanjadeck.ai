import Image from "next/image";
import Container from "@/app/components/Container";
import OverallProgress from "./OverallProgress";
import { userProfile } from "@/mockup/mockup-data";

export default function ProgressContainer() {
    return (
        <>
            <Image src={userProfile} alt="user profile image" width={180} height={180} className="rounded-full" />
            <Container className="border-[#D9D9D9] border flex flex-col gap-4">
                <h3>Overall Progress</h3>
                <OverallProgress/>
            </Container>
        </>
    )
}