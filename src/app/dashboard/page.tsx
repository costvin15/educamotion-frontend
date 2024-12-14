import { Navbar } from '@/components/ui/NavBar';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { SearchFilter } from '@/app/dashboard/components/SearchFilter';
import { SlideGrid } from '@/app/dashboard/components/SlideGrid';
import { UserInformation } from '@/app/dashboard/components/UserInformation';

export default function Dashboard() {
  return (
    <div>
      <Navbar>
        <ThemeSwitcher />
        <UserInformation />
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
