import Image from "next/image";

export default function UserProfilePicture({ imageUrl, size = 180 }: { imageUrl: string | null | undefined, size?: number }) {
    return (
        <div className="cursor-pointer inline-block rounded-full overflow-hidden">
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