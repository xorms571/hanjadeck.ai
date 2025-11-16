import Image from "next/image";
import { redirect } from 'next/navigation';
import { getCurrentUser } from "@/lib/auth";
import { getTotalCardCount } from "@/lib/cards"; // Import getTotalCardCount
import Container from "@/app/components/Container";
import ProgressOverview from "./ProgressOverview";
import UserProfilePicture from "./UserProfilePicture";
import OverallProgress from "./OverallProgress";
import DashboardHeader from "./DashboardHeader";
import BookmarkedCardsList from "./BookmarkedCardsList"; // Import BookmarkedCardsList

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/login');
    }

    const totalCards = await getTotalCardCount(); // Fetch total card count
    const bookmarkedCards = user.bookmarks.map(bookmark => bookmark.card); // Extract cards from bookmarks

    return (
        <div className="max-w-[630px] lg:max-w-max mx-auto">
            <DashboardHeader user={user} />
            <div className="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-6">
                <div>
                    <Image src='/dashboard.svg' width={630} height={393} alt="dashboard image" />
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <ProgressOverview user={user} />
                    </ul>
                </div>
                <Container className="flex flex-col items-center gap-8" shadow>
                    <UserProfilePicture imageUrl={user.imageUrl} />
                    <Container className="border-[#D9D9D9] border flex flex-col gap-4">
                        <h3>Overall Progress</h3>
                        <OverallProgress user={user} totalCards={totalCards} />
                    </Container>
                    <Container className="border-[#D9D9D9] border flex flex-col gap-4 w-full">
                        <h3>Bookmarked Cards</h3>
                        <BookmarkedCardsList bookmarkedCards={bookmarkedCards} />
                    </Container>
                </Container >
            </div>
        </div>
    )
}