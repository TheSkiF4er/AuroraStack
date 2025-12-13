export type Session = {
  userId: string;
  roles?: string[];
  issuedAt: number;
};

export type AuthProvider = {
  verify: (token: string) => Promise<Session | null>;
};

let provider: AuthProvider | null = null;

export function configureAuth(p: AuthProvider): void {
  provider = p;
}

export async function authenticate(token: string): Promise<Session | null> {
  if (!provider) return null;
  return provider.verify(token);
}
