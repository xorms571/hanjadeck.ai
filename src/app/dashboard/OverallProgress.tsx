import { mockupCards, userData } from "@/mockup/mockup-data";
import ProcessBar from "../components/ProcessBar";
export default function OverallProgress() {
    const { learned } = userData //사용자 데이터에서 학습한 문자 수 가져오기
    const goal = mockupCards.length; //전체 카드 수
    const progressPercentage = (learned / goal) * 100; //진행률 백분율 계산
    const nextGoalPercentage = 100 - progressPercentage; //다음 목표까지 남은 백분율 계산
    return (
        <>
            <p>Keep going! You’ve learned <span className="text-(--primary)">{learned}</span> out of the <span className="text-(--primary)">{goal}</span> characters to reach your next goal.</p>
            <ProcessBar number={progressPercentage} />
            <p className="text-end"><span className="text-(--primary)">{nextGoalPercentage.toFixed(1)}%</span> to next goal</p>
        </>
    );
}