'use client'
import { useEffect, useState } from 'react';
import { DoorOpen, Loader2 } from 'lucide-react';

import client from '@/client';

import { useToast } from '@/hooks/use-toast';

import { Navbar } from '@/components/ui/NavBar';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';

import { SearchFilter } from '@/app/dashboard/components/SearchFilter';
import { SlideGrid } from '@/app/dashboard/components/SlideGrid';
import { UserInformation } from '@/app/dashboard/components/UserInformation';
import { Slide, Slides, SortOptions } from '@/app/dashboard/types/slides';
import { JoinClassroomModal } from '@/app/dashboard/components/JoinClassroomModal';

const fetchSlides = async () : Promise<Slides> => {
  const { data } = await client.get('/presentation/list');
  return data;
}

export default function Dashboard() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [joinClassroomModalOpen, setJoinClassroomModalOpen] = useState(false);
  const [slides, setSlides] = useState([] as Slide[]);
  const [filteredSlides, setFilteredSlides] = useState([] as Slide[]);

  useEffect(() => {
    handleLoadSlides();
  }, []);

  const handleImportError = () => {
    toast({
      title: 'Falha ao importar apresentação',
      description: 'Não foi possível importar a apresentação. Tente novamente mais tarde.',
      variant: 'destructive',
    });
  };

  const handleImportSuccess = () => {
    toast({
      title: 'Apresentação importada com sucesso',
      description: 'A apresentação foi importada com sucesso.',
      variant: 'default',
    });
    handleLoadSlides();
  }

  const handleSearch = (query: string) => {
    const filtered = slides.filter((slide) =>
      slide.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSlides(filtered);
  }

  const handleSort = (value: SortOptions) => {
    const sorted = [...filteredSlides].sort((a, b) => {
      switch (value) {
        case SortOptions.Name:
          return a.title.localeCompare(b.title);
        case SortOptions.MostRecentOpened:
          return b.lastModified > a.lastModified ? -1 : 1;
        case SortOptions.Date:
        default:
          return b.createdAt > a.createdAt ? -1 : 1;
      }
    });
    setFilteredSlides(sorted);
  }

  const handleLoadSlides = async () => {
    setIsLoading(true);
    const slides = await fetchSlides();
    setSlides(slides.presentations);
    setFilteredSlides(slides.presentations);
    setIsLoading(false);
  }

  return (
    <div>
      <Navbar>
        <ThemeSwitcher />
        <UserInformation />
      </Navbar>

      {isLoading && (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {!isLoading && (
        <div className="container mx-auto px-4 py-8">
          <SearchFilter
            onSearch={handleSearch}
            onSort={handleSort}
            onImport={handleImportSuccess}
            onError={handleImportError}
          />
          <SlideGrid slides={filteredSlides} />

          <JoinClassroomModal
            isOpen={joinClassroomModalOpen}
            onClose={() => setJoinClassroomModalOpen(false)}
          />

          <FloatingActionButton
            icon={<DoorOpen className='h-6 w-6' />}
            onClick={() => setJoinClassroomModalOpen(true)}
          />
        </div>
      )}
    </div>
  );
}
