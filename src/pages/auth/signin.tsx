'use client'
import '@/app/globals.css';

import Head from 'next/head';
import { getServerSession } from 'next-auth';
import { getProviders, signIn } from 'next-auth/react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/ui/NavBar';
import { KeyRound } from 'lucide-react';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';

function LoginButtons({ providers } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        {Object.values(providers).map(provider => (
          <Button variant='outline' className='w-full' onClick={() => signIn(provider.id)}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continuar com Google
          </Button>
        ))}
      </div>
    </div>
  );
}

export default function Login({ providers } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <Head>
        <title>Fazer login em EducaMotion</title>
      </Head>

      <div className='min-h-screen flex items-center justify-center bg-background p-4'>
        <div className='absolute top-0 w-full'>
          <Navbar>
            <ThemeSwitcher />
          </Navbar>
        </div>

        <div className='max-w-5xl w-full grid md:grid-cols-2 gap-6'>
          <Card className='w-full backdrop-blur-sm bg-card/50 shadow-xl'>
            <CardHeader className='space-y-1'>
              <div className='flex items-center gap-2'>
                <KeyRound className='w-5 h-5 text-primary' />
                <CardTitle>Assistir Apresentação</CardTitle>
              </div>
              <CardDescription>
                Por favor, insira o código de apresentação fornecido pelo apresentador.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='code'>Código de Apresentação</Label>
                  <Input
                    id='code'
                    type='text'
                    placeholder='Insira o código de apresentação'
                    className='text-lg tracking-wider'
                  />
                </div>
                <Button className='w-full'>
                  Entrar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className='w-full max-w-md'>
            <CardHeader className='space-y-1'>
              <CardTitle className='font-bold text-center'>Bem vindo ao EducaMotion</CardTitle>
              <CardDescription className='text-center'>Entre com sua conta para acessar o painel de apresentador</CardDescription>
              <CardContent className='pt-6'>
                <LoginButtons providers={providers} />
              </CardContent>
              <div className='relative'>
                <div className='pb-6 flex items-center'>
                  <span className='w-full border-t' />
                </div>
              </div>
              <CardFooter className='flex flex-col space-y-2 text-center text-sm text-muted-foreground'>
                <div>
                  Dúvidas? Entre em contato através do <a href='mailto:costacastrovinicius7@gmail.com'>email</a>.
                </div>
              </CardFooter>
            </CardHeader>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  )
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: '/dashboard' } };
  }

  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  };
}
