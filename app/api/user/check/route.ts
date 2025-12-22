import { NextResponse } from 'next/server';
import { prisma } from '@/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { walletAddress } = body;

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        walletAddress: walletAddress,
      },
    });

    return NextResponse.json({
      exists: !!user,
      user: user || null,
    });
  } catch (error) {
    console.error('Error checking user:', error);
    return NextResponse.json(
      { error: 'Failed to check user', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

