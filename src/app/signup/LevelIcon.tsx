interface LevelIconProps {
    level: string;
    selected?: boolean;
}

export default function LevelIcon({ level, selected }: LevelIconProps) {
    const activeColor = selected ? "#2B1751" : "#7745D7";
    const inactiveColor = selected ? "#FCFCF4" : "#E0E0E3";

    const firstRectFill = activeColor;
    const secondElementFill = (level === "Intermediate" || level === "Advanced") ? activeColor : inactiveColor;
    const thirdRectFill = (level === "Advanced") ? activeColor : inactiveColor;

    return (
        <svg className="inline-block" width="26" height="29" viewBox="0 0 26 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="12" width="6" height="10" rx="2" fill={firstRectFill} />
            <path d="M10 9C10 7.89543 10.8954 7 12 7H14C15.1046 7 16 7.89543 16 9V14.5V20C16 21.1046 15.1046 22 14 22H12C10.8954 22 10 21.1046 10 20V9Z" fill={secondElementFill} />
            <rect x="20" y="1" width="6" height="21" rx="2" fill={thirdRectFill} />
        </svg>
    )
}
