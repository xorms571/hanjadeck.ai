import Image from "next/image";

export default function Dashboard() {
    return(
        <div>
            <h1>Welcome back, Hannah!</h1>
            <div>
                <div>
                    <Image src='/dashboard.svg' width={630} height={393} alt="dashboard image"/>
                </div>
            </div>
        </div>
    )
}