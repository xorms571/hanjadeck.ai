interface props {
    className?: string;
    children: React.ReactNode;
    shadow?: boolean;
}
export default function Container({ className, children, shadow }: props) {
    return (
        <div className={`bg-(--secondary-white) p-6 ${className} rounded-3xl ${shadow ? "shadow-lg" : ""}`} >
            {children}
        </div>
    )
}