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

export default function ProgressOverview({ user }: { user: User }) {
    // Map the user object properties to the keys used by progressMeta
    const progress: ProgressData = {
        streak: user.streak,
        learned: user.learnedCount,
        mastered: user.masteredCount,
        review: user.reviewCount,
    };

    return (
        <>
            {progressMeta.map((item) => (
                <li key={item.key}>
                    <Container className="flex gap-4 items-center" shadow>
                        <Image src={item.icon} alt={item.alt} width={68} height={68} />
                        <div className="truncate">
                            <span className="text-[#474141]">{item.title}</span>
                            <h3 className={progress ? "" : "animate-pulse"}>{progress[item.key]} {" "}
                                {item.key === 'streak' ? 'days' : 'hanja'}
                            </h3>
                        </div>
                    </Container>
                </li>
            ))}
        </>
    )
}