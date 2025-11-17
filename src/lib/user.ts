import prisma from '@/lib/prisma';

type StreakInfo = {
    streak: number;
    lastSeenAt: Date | null;
};

export async function updateUserStreak(user: { id: string, streak: number, lastSeenAt: Date | null }): Promise<StreakInfo> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    const lastSeen = user.lastSeenAt;
    if (!lastSeen) {
        // First time user is seen, start streak
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: { streak: 1, lastSeenAt: new Date() },
        });
        return { streak: updatedUser.streak, lastSeenAt: updatedUser.lastSeenAt };
    }

    const lastSeenDate = new Date(lastSeen);
    lastSeenDate.setHours(0, 0, 0, 0); // Start of last seen day

    const diffTime = today.getTime() - lastSeenDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);

    if (diffDays === 1) {
        // Consecutive day
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: { streak: { increment: 1 }, lastSeenAt: new Date() },
        });
        return { streak: updatedUser.streak, lastSeenAt: updatedUser.lastSeenAt };
    } else if (diffDays > 1) {
        // Streak broken
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: { streak: 1, lastSeenAt: new Date() },
        });
        return { streak: updatedUser.streak, lastSeenAt: updatedUser.lastSeenAt };
    }
    // if diffDays is 0 or less, do nothing, user already visited today.
    return { streak: user.streak, lastSeenAt: user.lastSeenAt };
}
