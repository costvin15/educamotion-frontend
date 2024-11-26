import { Search } from 'lucide-react';

export function SearchFilter() {
  return (
    <div className='flex flex-col sm:flex-row gap-4 mb-8'>
      <div className='relative flex-1'>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      </div>
    </div>
  );
}
