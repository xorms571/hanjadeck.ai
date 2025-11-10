interface props {
    padding?: '24px' | '48px';
    background?: '#F8F8F8'
    className?: string;
    childern: React.ReactNode;
}
export default function Container({ background, padding, className, childern }: props) {
    return (
        <div className={`${background} ${padding} ${className}`}>
            {childern}
        </div>
    )
}