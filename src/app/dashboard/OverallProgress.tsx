import ProcessBar from "../components/ProcessBar";
import { User } from "@/lib/auth"; // Import User type

export default function OverallProgress({ user, totalCards }: { user: User, totalCards: number }) {
    const learned = user.learnedCount; // Get learned count from user prop
    const goal = totalCards; // Use totalCards prop
    const progressPercentage = (learned / goal) * 100;
    const nextGoalPercentage = 100 - progressPercentage;

    return (
        <>
            <p>Keep going! You’ve learned <span className="text-(--primary)">{learned}</span> out of the <span className="text-(--primary)">{goal}</span> characters to reach your next goal.</p>
            <ProcessBar number={progressPercentage} />
            <p className="text-end"><span className="text-(--primary)">{nextGoalPercentage.toFixed(1)}%</span> to next goal</p>
        </>
    );
}