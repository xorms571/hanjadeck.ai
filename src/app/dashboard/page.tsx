import Image from "next/image";
import Container from "@/app/components/Container";
import ProgressOverview from "./ProgressOverview";
import GreetingWithUserName from "./GreetingWithUserName";
import UserProfilePicture from "./UserProfilePicture";
import OverallProgress from "./OverallProgress";

export default function DashboardPage() {
    return (
        <div className="max-w-[630px] lg:max-w-max mx-auto">
            <GreetingWithUserName />
            <div className="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-6">
                <div>
                    <Image src='/dashboard.svg' width={630} height={393} alt="dashboard image" />
                    <ul className="grid grid-cols-2 gap-6 mt-6">
                        <ProgressOverview />
                    </ul>
                </div>
                <Container className="flex flex-col items-center gap-8">
                    <UserProfilePicture />
                    <Container className="border-[#D9D9D9] border flex flex-col gap-4">
                        <h3>Overall Progress</h3>
                        <OverallProgress />
                    </Container>
                </Container >
            </div>
        </div>
    )
}