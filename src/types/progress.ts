type ProgressKey = "streak" | "learned" | "mastered" | "review";

interface ProgressItem {
    key: ProgressKey;
    icon: string;
    alt: string;
    title: string;
}

export const progressMeta: ProgressItem[] = [
    { key: "streak", icon: "/🔥.png", alt: "streak icon", title: "Study Streak" },
    { key: "learned", icon: "/🧑_🎓.png", alt: "learned icon", title: "Learned" },
    { key: "mastered", icon: "/✅.png", alt: "mastered icon", title: "Mastered" },
    { key: "review", icon: "/🤓.png", alt: "review icon", title: "Hanja to review" },
];