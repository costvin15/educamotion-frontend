import type { JWT } from 'next-auth/jwt';
import NextAuth, { AuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

const refreshAccessToken = async (token: JWT) => {
  const response = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_ID ?? '',
      client_secret: process.env.KEYCLOAK_SECRET ?? '',
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    }),
    method: "POST",
    cache: "no-store",
  });

  const refreshedToken = await response.json();
  if (!response.ok) {
    throw refreshedToken;
  }

  return {
    ...token,
    accessToken: refreshedToken.access_token,
    accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
    refreshToken: refreshedToken.refresh_token,
  };
};

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
      if (user && account) {
        token.accessToken = account.access_token!;
        token.refreshToken = account.refresh_token!;
        token.accessTokenExpires = account.expires_at!;
        token.id = user.id;
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    session: async ({ token, session }: { token: JWT; session: any }) => {
      if (token) {
        session.user.id = token.id;
        session.user.token = token.accessToken;
      }
      return session;
    },
  }
};

export default NextAuth(authOptions);
