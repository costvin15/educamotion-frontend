'use client';
import { useState } from 'react';
import { ChevronDown, Plus, Search } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { SortOptions } from '@/app/dashboard/types/slides';
import { ImportGoogleSlideModal } from '@/app/dashboard/components/ImportGoogleSlideModal';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onSort: (value: SortOptions) => void;
}

export function SearchFilter({ onSearch, onSort } : SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  }

  return (
    <div className='flex flex-col sm:flex-row gap-4 mb-8'>
      <div className='relative flex-1'>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder='Pesquisar apresentações...'
          value={searchQuery}
          onChange={handleSearch}
          className='pl-10'
        />
      </div>
      <div className='flex gap-4'>
        <Select onValueChange={onSort} defaultValue='Date'>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Name'>Nome</SelectItem>
            <SelectItem value='MostRecentOpened'>Mais recente aberto</SelectItem>
            <SelectItem value='Date'>Data de criação</SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Plus className='mr-2 h-4 w-4' />
              Nova apresentação
              <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              Apresentação em branco
            </DropdownMenuItem>
            <DropdownMenuItem>
              Utilizar template
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsImportModalOpen(true)}>
              Importar apresentação do Google Slides
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ImportGoogleSlideModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} />
    </div>
  );
}
