import { useEffect, useRef } from "react";

export default function SvgPathAnimationCSS({ strokeWidth, color, zIndex = '-z-30', top = 'top-1/2', className, transition = 2 }: { strokeWidth: number, color: string, zIndex?: string, top?: string, className?: string, transition?: number }) {
    const pathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        const path = pathRef.current;
        // path가 null일 수 있으므로, 렌더링된 후에만 로직을 실행합니다.
        if (path) {
            const length = path.getTotalLength();

            path.style.strokeDasharray = String(length);
            path.style.strokeDashoffset = String(length);

            // 애니메이션 시작
            const timer = setTimeout(() => {
                path.style.transition = `stroke-dashoffset ${transition}s ease-in-out`;
                path.style.strokeDashoffset = "0";
            }, 100);

            // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <svg className={`absolute left-1/2 -translate-x-1/2 ${zIndex} ${top} w-full h-full ${className}`}>
            <path
                ref={pathRef}
                d="M-100 400 C 200 200, 400 600, 700 400 S 1000 200, 1300 400 S 1600 600, 1900 400 S 2200 300, 2500 500"
                stroke={color}
                strokeWidth={strokeWidth}
                fill="transparent"
            />
        </svg>
    );
}
