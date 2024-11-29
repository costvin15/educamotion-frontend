import { User, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/DropdownMenu';
import { Navbar } from '@/components/ui/NavBar';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { SearchFilter } from '@/app/dashboard/components/SearchFilter';
import { SlideGrid } from '@/app/dashboard/components/SlideGrid';

export default function Dashboard() {
  return (
    <div>
      <Navbar>
        <ThemeSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant='ghost' className='relative h-10 w-10 rounded-full' asChild>
              <div>
                <Avatar>
                  <AvatarImage src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60' />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Navbar>
      <div className="container mx-auto px-4 py-8">
        <SearchFilter />
        <SlideGrid slides={[{
          id: '1',
          title: 'Hello, World!',
          thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=60',
          createAt: new Date(),
          lastOpenedAt: new Date(),
        }]} />
      </div>
    </div>
  );
}
