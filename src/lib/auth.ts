import { cookies } from 'next/headers';
import { AuthClient } from '@/lib/sdk';

export interface Session {
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: string;
  };
  organization?: {
    id: string;
    name: string;
    slug: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

const SESSION_COOKIE_NAME = 'wabtechs_session';

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    const session = JSON.parse(sessionCookie.value) as Session;

    if (Date.now() >= session.expiresAt) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function createSession(session: Session) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function refreshSession(): Promise<Session | null> {
  const session = await getSession();
  if (!session) return null;

  try {
    const result = await AuthClient.session();

    const newSession: Session = {
      ...session,
      accessToken: result.accessToken || session.accessToken,
      refreshToken: result.refreshToken || session.refreshToken,
      expiresAt: Date.now() + (result.expiresIn || 900) * 1000,
    };

    await createSession(newSession);
    return newSession;
  } catch {
    await destroySession();
    return null;
  }
}

export function getAuthHeaders(session: Session) {
  return {
    Authorization: `Bearer ${session.accessToken}`,
    'X-Organization-ID': session.organization?.id || '',
  };
}
