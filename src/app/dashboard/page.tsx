import Image from "next/image";
import Container from "@/app/components/Container";
import ProgressOverview from "./ProgressOverview";
import ProgressContainer from "./ProgressContainer";
import GreetingWithUserName from "./GreetingWithUserName";

export default function Dashboard() {
    return (
        <div className="min-h-dvh max-w-[630px] lg:max-w-max mx-auto">
            <GreetingWithUserName/>
            <div className="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-6">
                <div>
                    <Image src='/dashboard.svg' width={630} height={393} alt="dashboard image" />
                    <ul className="grid grid-cols-2 gap-6 mt-6">
                        <ProgressOverview />
                    </ul>
                </div>
                <Container className="flex flex-col items-center gap-8">
                    <ProgressContainer />
                </Container >
            </div>
        </div>
    )
}