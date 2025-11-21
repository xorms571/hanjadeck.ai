'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function UserProfilePicture({ imageUrl, size = 180, targetUserId }: { imageUrl: string | null | undefined, size?: number, targetUserId?: string }) {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (targetUserId) {
            router.push(`/dashboard/${targetUserId}`);
        }
    };

    const cursorStyle = targetUserId ? "cursor-pointer" : "";

    return (
        <div className={`inline-block rounded-full overflow-hidden ${cursorStyle}`} onClick={handleClick}>
            {imageUrl ?
                <Image
                    src={imageUrl} alt="user profile image"
                    width={size} height={size} /> :
                <Image
                    src='/no-user-picture.svg' alt="there's no user profile image"
                    width={size} height={size} className="bg-(--neutrals-white)" />}
        </div>
    )
}