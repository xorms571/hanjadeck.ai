interface props {
    size?: number;
    color?: "#17151A" | "#F8F8F8";
    direction?: "left" | "right";
}
export const CircleArrowIcon = ({
    size = 40,
    color = "#17151A",
    direction = "left",
}: props) => {
    const rotation =
        direction === "right"
            ? "rotate(180 20 20)"
            : undefined;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color }}
        >
            <path
                d="M19.9987 3.32172C10.8104 3.32338 3.3337 10.8001 3.33203 19.99C3.33203 29.18 10.8087 36.6567 20.0004 36.6567C29.1904 36.655 36.667 29.1784 36.667 19.99C36.667 10.8001 29.1904 3.32338 19.9987 3.32172ZM20.0004 33.3234C12.647 33.3234 6.66536 27.3417 6.66536 19.99C6.66703 12.6384 12.6487 6.65672 19.9987 6.65505C27.352 6.65672 33.3337 12.6384 33.3337 19.99C33.3337 27.34 27.352 33.3217 20.0004 33.3234Z"
                fill="currentColor"
            />
            <path
                d="M20.0204 13.315L13.3454 19.99L20.0204 26.6633V21.6567H26.677V18.3233H20.0204V13.315Z"
                fill="currentColor"
                transform={rotation}
            />
        </svg>
    );
};