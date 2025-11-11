import Container from "@/app/components/Container";
import OverallProgress from "./OverallProgress";
import UserProfilePicture from "./UserProfilePicture";

export default function ProgressContainer() {
    return (
        <>
            <UserProfilePicture/>
            <Container className="border-[#D9D9D9] border flex flex-col gap-4">
                <h3>Overall Progress</h3>
                <OverallProgress/>
            </Container>
        </>
    )
}