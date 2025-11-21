import client from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        if (!id) {
            return new NextResponse(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
        }

        const user = await client.user.findUnique({
            where: {
                id: id,
            },
            select: {
                name: true,
                imageUrl: true,
            }
        });

        if (!user) {
            return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        return new NextResponse(JSON.stringify(user), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
