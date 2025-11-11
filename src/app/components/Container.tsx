interface props {
    background?: '#F8F8F8'
    className?: string;
    children: React.ReactNode;
}
export default function Container({ background = '#F8F8F8', className, children }: props) {
    return (
        <div className={`bg-[${background}] p-6 ${className} rounded-3xl`} >
            {children}
        </div>
    )
}