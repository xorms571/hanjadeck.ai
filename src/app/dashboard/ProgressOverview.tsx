import { dashboardMockUpData1 } from "@/mockup/mockup-data";
import Container from "@/app/components/Container";
import Image from "next/image";
export default function ProgressOverview() {
    return (
        dashboardMockUpData1.map((item, index) => (
            <li key={index}>
                <Container className="flex gap-4 items-center">
                    <Image src={item.icon} width={68} height={68} alt={item.alt} />
                    <div className="truncate">
                        <span className="text-[#474141]">{item.title}</span>
                        <h3>{item.value} {item.title === 'Study Streak' ? 'days' : 'hanja'}</h3>
                    </div>
                </Container>
            </li>
        ))
    )
}