import Image from "next/image";
import Container from "@/app/components/Container";
import { progressMeta } from "@/types/progress";
import { User } from "@/lib/auth"; // Assuming User type is exported from auth

type ProgressData = {
    streak: number;
    learned: number;
    mastered: number;
    review: number;
};

export default function ProgressOverview({ user, review }: { user: User, review: number }) {
    // Map the user object properties to the keys used by progressMeta
    const progress: ProgressData = {
        streak: user.streak,
        learned: user.learnedCount,
        mastered: user.masteredCount,
        review,
    };

    return (
        <ul className="grid grid-cols-2 gap-6 mt-6">
            {progressMeta.map((item) => (
                <li key={item.key}>
                    <Container className="flex flex-col p-4! md:p-6! md:flex-row gap-4 aspect-square md:aspect-auto justify-center md:justify-start md:items-center" shadow>
                        <div className="w-8 aspect-square relative md:w-[68px]"><Image src={item.icon} alt={item.alt} fill /></div>
                        <div className="truncate">
                            <span className="text-[#474141] text-[16px] md:text-[22px]">{item.title}</span>
                            <h3 className="text-[22px]! md:text-[28px]!">{progress[item.key]} {" "}
                                {item.key === 'streak' ? 'days' : 'hanja'}
                            </h3>
                        </div>
                    </Container>
                </li>
            ))}
        </ul>
    )
}