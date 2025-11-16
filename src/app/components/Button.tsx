interface props {
    className?: string;
    children: React.ReactNode;
    background?: 'primary' | 'secondary';
    icon?: React.ReactNode;
    shadow?: boolean;
    type?: "button" | "reset" | "submit";
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ className = '', children, background = 'primary', shadow = false, icon, type = 'button', disabled = false, onClick }: props) {
    const baseStyle = 'w-full max-w-[480px] h-[58px] rounded-[180px] text-bold disabled:cursor-default! disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:text-white'
    const backgroundStyle = background === 'primary' ? 'bg-(--primary) text-white hover:bg-(--primary-hover)' : 'bg-(--secondary-white) hover:bg-(--neutrals-white)'
    const iconStyle = icon ? 'flex justify-center items-center gap-4' : ''
    const shadowStyle = shadow ? 'shadow' : ''
    return (
        <button disabled={disabled} type={type} onClick={onClick} className={`${baseStyle} ${backgroundStyle} ${iconStyle} ${shadowStyle} ${className}`}>
            {icon}{children}
        </button>
    )
}