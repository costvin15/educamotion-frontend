import NextAuth, { AuthOptions, CallbacksOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { authenticate, userInfo } from '@/client';

const providers = [
  KeycloakProvider({
    clientId: process.env.KEYCLOAK_ID ?? '',
    clientSecret: process.env.KEYCLOAK_SECRET ?? '',
    issuer: process.env.KEYCLOAK_ISSUER ?? ''
  })
];

export const authOptions : AuthOptions = {
  providers,
  pages: {
    signIn: '/auth/signin'
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
