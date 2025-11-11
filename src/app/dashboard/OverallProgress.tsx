import { goal, learned } from "@/mockup/mockup-data";

export default function OverallProgress() {
    const progressPercentage = (learned / goal) * 100;
    const nextGoalPercentage = 100 - progressPercentage;
    return (
        <>
            <p>Keep going! You’ve learned <span className="text-(--primary)">{learned}</span> out of the <span className="text-(--primary)">{goal}</span> characters to reach your next goal.</p>
            <div className="w-full bg-(--neutrals-white) rounded-full h-2.5">
                <div className="bg-(--primary) h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <p className="text-end"><span className="text-(--primary)">{nextGoalPercentage.toFixed(1)}%</span> to next goal</p>
        </>
    );
}