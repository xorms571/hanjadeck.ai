interface props {
    number: number;
    background?: 'secondary' | 'neutral';
}
export default function ProcessBar({ number, background='neutral' }: props) {
    const backgroundStyle = background === 'secondary' ? 'bg-(--secondary-white)' : 'bg-(--neutrals-white)';
    return (
        <div className={`${backgroundStyle} w-full rounded-full h-2.5`}>
            <div className="bg-(--primary) h-2.5 rounded-full" style={{ width: `${number}%` }}></div>
        </div>
    )
}