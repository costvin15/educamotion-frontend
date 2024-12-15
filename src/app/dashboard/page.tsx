'use client'
import { useEffect, useState } from 'react';

import client from '@/client';
import { Navbar } from '@/components/ui/NavBar';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { SearchFilter } from '@/app/dashboard/components/SearchFilter';
import { SlideGrid } from '@/app/dashboard/components/SlideGrid';
import { UserInformation } from '@/app/dashboard/components/UserInformation';
import { Slide, Slides, SortOptions } from '@/app/dashboard/types/slides';

const fetchSlides = async () : Promise<Slides> => {
  const { data } = await client.get('/presentation/imported');
  return data;
}

export default function Dashboard() {
  const [slides, setSlides] = useState([] as Slide[]);
  const [filteredSlides, setFilteredSlides] = useState([] as Slide[]);

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
          return b.updatedAt > a.updatedAt ? -1 : 1;
        case SortOptions.Date:
        default:
          return b.createdAt > a.createdAt ? -1 : 1;
      }
    });
    setFilteredSlides(sorted);
  }

  useEffect(() => {
    (async () => {
      const slides = await fetchSlides();
      setSlides(slides.presentations);
      setFilteredSlides(slides.presentations);
    })();
  }, []);

  return (
    <div>
      <Navbar>
        <ThemeSwitcher />
        <UserInformation />
      </Navbar>
      <div className="container mx-auto px-4 py-8">
        <SearchFilter onSearch={handleSearch} onSort={handleSort} />
        <SlideGrid slides={filteredSlides} />
      </div>
    </div>
  );
}
