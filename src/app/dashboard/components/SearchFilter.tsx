'use client';
import { ChevronDown, Plus, Search } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

export function SearchFilter() {
  return (
    <div className='flex flex-col sm:flex-row gap-4 mb-8'>
      <div className='relative flex-1'>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder='Pesquisar apresentações...'
          value=''
          onChange={() => {}}
          className='pl-10'
        />
      </div>
      <div className='flex gap-4'>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Nome'>Nome</SelectItem>
            <SelectItem value='MaisRecenteAberto'>Mais recente aberto</SelectItem>
            <SelectItem value='Data'>Data de criação</SelectItem>
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
            <DropdownMenuItem>
              Importar apresentação do Google Slides
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
