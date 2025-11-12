interface props {
    className?: string;
    children: React.ReactNode;
    background?: 'primary' | 'secondary';
    icon?: React.ReactNode;
    shadow?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ className = '', children, background = 'primary', shadow = false, icon,onClick }: props) {
    const baseStyle = 'w-full max-w-[480px] h-[58px] rounded-[180px] text-bold'
    const backgroundStyle = background === 'primary' ? 'bg-(--primary) text-white hover:bg-(--primary-hover)' : 'bg-(--secondary-white) hover:bg-(--neutrals-white)'
    const iconStyle = icon ? 'flex justify-center items-center gap-4' : ''
    const shadowStyle = shadow ? 'shadow' : ''
    return (
        <button onClick={onClick} className={`${baseStyle} ${backgroundStyle} ${iconStyle} ${shadowStyle} ${className}`}>
            {icon}{children}
        </button>
    )
}