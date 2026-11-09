import { cookies } from 'next/headers';

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'editor';
}

const DEFAULT_USERS: Record<string, { user: AdminUser; pass: string }> = {
  admin: {
    user: {
      id: 'usr-1',
      username: 'admin',
      name: 'Administrator',
      role: 'admin',
    },
    pass: 'naghfir2026',
  },
  editor: {
    user: {
      id: 'usr-2',
      username: 'editor',
      name: 'Tim Redaksi / Editor',
      role: 'editor',
    },
    pass: 'editor2026',
  },
};

const SESSION_COOKIE_NAME = 'naghfir_session';

export function verifyCredentials(username: string, pass: string): AdminUser | null {
  const match = DEFAULT_USERS[username.toLowerCase().trim()];
  if (match && match.pass === pass) {
    return match.user;
  }
  return null;
}

export function getCurrentUser(): AdminUser | null {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    // Token format: base64 encoded user info with timestamp
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parsed = JSON.parse(decoded);
    if (parsed && parsed.username) {
      return parsed as AdminUser;
    }
  } catch (err) {
    // ignore invalid session
  }
  return null;
}

export function createSessionToken(user: AdminUser): string {
  const payload = {
    ...user,
    issuedAt: Date.now(),
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export { SESSION_COOKIE_NAME };
