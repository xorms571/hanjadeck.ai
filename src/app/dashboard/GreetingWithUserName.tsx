export default function GreetingWithUserName({ name, isCurrentUserDashboard }: { name: string, isCurrentUserDashboard: boolean }) {
    return (
        <>
            {isCurrentUserDashboard ?
                <h1 className="mb-12 text-[28px]! md:text-[48px]! lg:text-[64px]!">Welcome back, <b className="text-(--primary)">{name}</b>!</h1>
                : <h1 className="mb-12 text-[28px]! md:text-[48px]! lg:text-[64px]!">Welcome to <b className="text-(--primary)">{name}</b>'s Dashboard!</h1>}
        </>
    )
}