import NextAuth, { AuthOptions, CallbacksOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { authenticate, userInfo } from '@/client';

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
  }),
];

const callbacks : Partial<CallbacksOptions> = {
  signIn: async ({ account, user }) => {
    console.log("Starting...");
    if (account && account.provider === 'google') {
      console.log('Entered google provider...');
      const {access_token} = await authenticate(account.id_token ?? '');
      console.log('Received access_token from backend', access_token);
      account.access_token = access_token;
      return true;
    }
    return false;
  },
  jwt: async ({ token, account }) => {
    if (account) {
      token = { accessToken: account.access_token };
    }
    return token;
  },
  session: async ({ session, token }) => {
    console.log('Gathering informations from user in the backend');
    const accessToken : string = token?.accessToken as string;
    const user = await userInfo(accessToken);
    console.log('Information received');
    console.log(user);

    session.user = {};
    session.user.name = user.name;
    session.user.email = user.email;
    session.user.image = user.picture;

    return session;
  },
};

export const authOptions : AuthOptions = {
  providers,
  pages: {
    signIn: '/auth/signin'
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks,
};

export default NextAuth(authOptions);
