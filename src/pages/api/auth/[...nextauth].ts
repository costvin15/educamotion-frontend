import NextAuth, { AuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

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
    maxAge: 60 * 60 * 12
  },
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    session: async ({ session, token }: any) => {
      session.user = token;
      session.user.token = token.accessToken;
      return session;
    },
  }
};

export default NextAuth(authOptions);
