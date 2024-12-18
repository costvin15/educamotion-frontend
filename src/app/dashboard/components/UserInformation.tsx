'use client';
import { LogOut, User } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';

const UserInformation = () => {
  const session = useSession();

  const getUsernameInitials = () => {
    const name = session.data?.user.name;
    if (!name) return '';
    const [firstName, lastName] = name.split(' ');
    return `${firstName[0]}${lastName[0]}`;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant='ghost'
          className='relative h-10 w-10 rounded-full'
          asChild
        >
          <div>
            <Avatar>
              <AvatarImage src={session.data?.user.picture || ''} />
              <AvatarFallback>
                {getUsernameInitials()}
              </AvatarFallback>
            </Avatar>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <User className='mr-2 h-4 w-4' />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem className='text-red-600 cursor-pointer' onClick={() => signOut()}>
          <LogOut className='mr-2 h-4 w-4' />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
};

export { UserInformation };
