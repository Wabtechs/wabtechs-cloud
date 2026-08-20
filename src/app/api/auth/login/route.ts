import { NextRequest, NextResponse } from 'next/server';
import { sdk } from '@/lib/sdk';
import { createSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const response = await sdk.post('/auth/login', { email, password });
    const { user, accessToken, refreshToken, expiresIn } = response.data;

    const session = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
      },
      accessToken,
      refreshToken,
      expiresAt: Date.now() + expiresIn * 1000,
    };

    await createSession(session);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    const message = error instanceof Error ? error.message : 'Authentication failed';
    return NextResponse.json({ message }, { status: 401 });
  }
}