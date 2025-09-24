import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getServerSession } from 'next-auth/next';
import { env } from './env';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          credentials?.email === 'test@example.com' &&
          credentials?.password === 'password123'
        ) {
          return {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt' as const,
  },
  secret: env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

export const auth = () => getServerSession(authOptions);
export { authOptions };

