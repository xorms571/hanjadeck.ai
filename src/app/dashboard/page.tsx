import Image from "next/image";
import Container from "@/app/components/Container";
import { dashboardMockUpData1, goal, learned } from "@/mockup/mockup-data";
import OverallProgress from "@/app/components/OverallProgress";

export default function Dashboard() {
    return (
        <div className="min-h-dvh">
            <h1 className="mb-12">Welcome back, Hannah!</h1>
            <div className="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-6">
                <div>
                    <Image src='/dashboard.svg' width={630} height={393} alt="dashboard image" />
                    <ul className="grid grid-cols-2 gap-6 mt-6">
                        {dashboardMockUpData1.map((item, index) => (
                            <li key={index}>
                                <Container className="flex gap-4 items-center">
                                    <Image src={item.icon} width={68} height={68} alt={item.alt} />
                                    <div className="truncate">
                                        <span className="text-[#474141]">{item.title}</span>
                                        <h3>{item.value}</h3>
                                    </div>
                                </Container>
                            </li>
                        ))}
                    </ul>
                </div>
                <Container className="flex flex-col items-center gap-8">
                    <Image src='/mockup/user.png' alt="user profile image" width={180} height={180} className="rounded-full" />
                    <Container className="border-[#D9D9D9] border flex flex-col gap-4">
                        <h3>Overall Progress</h3>
                        <OverallProgress learned={learned} goal={goal} />
                    </Container>
                </Container >
            </div>
        </div>
    )
}