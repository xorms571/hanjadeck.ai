interface props {
    className?: string;
    children: React.ReactNode;
    background?: 'primary' | 'secondary';
    icon?: React.ReactNode;
}

export default function Button({ className, children, background = 'primary', icon }: props) {
    const baseStyle = 'w-full max-w-[480px] h-[58px] rounded-[180px]'
    const backgroundStyle = background === 'primary' ? 'bg-(--primary) text-white' : 'bg-(--secondary-white)'
    const iconStyle = icon && 'flex justify-center items-center gap-4'
    return (
        <button className={`${baseStyle} ${backgroundStyle} ${iconStyle} ${className}`}>
            {icon}{children}
        </button>
    )
}