import { getCurrentUser } from '@/lib/auth';
import { getCards } from '@/lib/cards';
import Searching from "./Searching";

export default async function LearnPage() {
    const user = await getCurrentUser();

    const cards = await getCards(user?.id, 1, 12);

    return (
        <div className="relative">
            <h2 className="mb-6 text-[28px]! lg:text-[64px]!">Find or create a flashcard</h2>
            <Searching initialCards={cards} user={user} />
        </div>
    )
}