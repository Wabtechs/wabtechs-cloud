import { NextRequest, NextResponse } from 'next/server';
import { sdk } from '@/lib/sdk';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, organizationName } = await request.json();

    if (!name || !email || !password || !organizationName) {
      return NextResponse.json(
        { message: 'Name, email, password, and organization name are required' },
        { status: 400 },
      );
    }

    const response = await sdk.post('/auth/register', {
      name,
      email,
      password,
      organizationName,
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Registration error:', error);
    const message = error instanceof Error ? error.message : 'Registration failed';
    return NextResponse.json({ message }, { status: 400 });
  }
}
