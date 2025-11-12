import Image from "next/image";
import Container from "@/app/components/Container";
import { progressMeta } from "@/types/progress";
import { userData } from "@/mockup/mockup-data";

export default function ProgressOverview() {
    const progress = userData.progress
    return (
        <>
            {progressMeta.map((item) => (
                <li key={item.key}>
                    <Container className="flex gap-4 items-center" shadow>
                        <Image src={item.icon} alt={item.alt} width={68} height={68} />
                        <div className="truncate">
                            <span className="text-[#474141]">{item.title}</span>
                            <h3 className={progress ? "" : "animate-pulse"}>{progress[item.key]} {" "}
                                {item.key === 'streak' ? 'days' : 'hanja'}
                            </h3>
                        </div>
                    </Container>
                </li>
            ))}
        </>
    )
}