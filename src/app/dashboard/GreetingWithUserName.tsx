export default function GreetingWithUserName({ name }: { name: string }) {
    return (
        <h1 className="mb-12 text-[28px]! lg:text-[64px]!">
            Welcome back, {name}!
        </h1>
    )
}