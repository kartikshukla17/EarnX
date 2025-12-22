import { NextResponse } from 'next/server';
import { prisma } from '@/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, walletAddress, userName } = body;

    if (!userId || !walletAddress) {
      return NextResponse.json(
        { error: 'User ID and wallet address are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        walletAddress: walletAddress,
      },
    });

    if (existingUser) {
      return NextResponse.json({
        success: true,
        user: existingUser,
        message: 'User already exists',
      });
    }

    // Check if userId is already taken
    const existingUserId = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });

    if (existingUserId) {
      return NextResponse.json(
        { error: 'User ID already exists' },
        { status: 409 }
      );
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        userId: userId,
        walletAddress: walletAddress,
      },
    });

    return NextResponse.json({
      success: true,
      user: user,
      message: 'User saved successfully',
    });
  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json(
      { error: 'Failed to save user', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

