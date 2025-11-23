import Image from "next/image";
import { redirect } from 'next/navigation';
import { getCurrentUser, getUserById } from "@/lib/auth"; // Import getUserById
import { getTotalCardCount } from "@/lib/cards";
import Container from "@/app/components/Container";
import ProfileImageUpdater from "../ProfileImageUpdater"; // Adjusted path
import OverallProgress from "../OverallProgress"; // Adjusted path
import BookmarkedCardsList from "../BookmarkedCardsList"; // Adjusted path
import GreetingWithUserName from "../GreetingWithUserName"; // Adjusted path
import Button from "@/app/components/Button"; // Adjusted path
import ProgressOverview from "../ProgressOverview"; // Adjusted path
import GeneratedCardsList from "../GeneratedCardsList"; // Adjusted path
import UserProfilePicture from "@/app/components/UserProfilePicture"; // Import UserProfilePicture

export default async function DashboardPage({ params }: { params: Promise<{ userId: string }> }) { // Accept params
    const sessionUser = await getCurrentUser(); // Get the logged-in user
    const { userId } = await params; // Await params to unwrap it
    const targetUser = await getUserById(userId); // Get the user for the dashboard

    if (!targetUser) {
        redirect('/'); // Redirect if target user not found
    }

    const totalCards = await getTotalCardCount(); // Fetch total card count
    const bookmarkedCards = targetUser.bookmarks.map(bookmark => ({ // Use targetUser
        ...bookmark.card,
        isBookmarked: true,
    }));

    // Determine if the currently logged-in user is viewing their own dashboard
    const isCurrentUserDashboard = sessionUser?.id === targetUser.id;

    return (
        <div className="max-w-[630px] lg:max-w-max mx-auto">
            <GreetingWithUserName name={targetUser.name} isCurrentUserDashboard={isCurrentUserDashboard} /> {/* Use targetUser */}
            <div className="flex flex-col lg:grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-6">
                <div>
                    <Image src='/dashboard.svg' width={630} height={393} alt="dashboard image" />
                    <ProgressOverview user={targetUser} review={bookmarkedCards.length} /> {/* Use targetUser */}
                    <GeneratedCardsList userId={targetUser.id} name={targetUser.name} isCurrentUserDashboard={isCurrentUserDashboard} /> {/* Pass userId to GeneratedCardsList */}
                </div>
                <Container className="flex flex-col items-center gap-8" shadow>
                    {isCurrentUserDashboard ? ( // Conditionally render ProfileImageUpdater
                        <ProfileImageUpdater initialImageUrl={targetUser.imageUrl} userId={targetUser.id} />
                    ) : (
                        <UserProfilePicture imageUrl={targetUser.imageUrl} size={180} /> // Display static image for others
                    )}
                    <Container className="border-[#D9D9D9] p-0! md:p-6! md:border flex flex-col gap-4">
                        <h3>Overall Progress</h3>
                        <OverallProgress user={targetUser} totalCards={totalCards} isCurrentUserDashboard={isCurrentUserDashboard} /> {/* Use targetUser */}
                    </Container>
                    <Container className="border-[#D9D9D9] p-0! md:p-6! md:border flex flex-col gap-6 w-full">
                        <div className="flex justify-between items-end">
                            <h3 className="text-[22px]!">Review Queue</h3>
                            <Button type="button" disabled className="disabled:bg-(--primary)! max-w-fit px-2 max-h-7! md:max-h-[38px]! text-sm! md:text-[18px]! font-bold">
                                {bookmarkedCards.length} Cards
                            </Button>
                        </div>
                        <BookmarkedCardsList bookmarkedCards={bookmarkedCards} isCurrentUserDashboard={isCurrentUserDashboard} />
                    </Container>
                </Container >
            </div>
        </div>
    )
}