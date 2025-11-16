import Image from "next/image";

export default function UserProfilePicture({ imageUrl }: { imageUrl: string | null | undefined }) {
    return (
        <div className="cursor-pointer inline-block rounded-full overflow-hidden">
            {imageUrl ?
                <Image
                    src={imageUrl} alt="user profile image"
                    width={180} height={180} /> :
                <Image
                    src='/no-user-picture.svg' alt="there's no user profile image"
                    width={180} height={180} className="bg-(--neutrals-white)" />}
        </div>
    )
}