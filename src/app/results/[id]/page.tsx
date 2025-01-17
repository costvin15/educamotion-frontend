import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/ui/NavBar";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { Pencil } from "lucide-react";
import Link from "next/link";

export default function ResultsLayout({ params } : { params : { id: string }}) {
  return (
    <div className='flex h-screel flex-col'>
      <Navbar>
        <ThemeSwitcher />

        <div className='mx-2 h-6 w-px bg-border' />

        <Link href={`/edit/${params.id}`}>
          <Button variant='outline' size='icon'>
            <Pencil className='h-4 w-4' />
          </Button>
        </Link>
      </Navbar>

      <div className='flex-1 flex flex-col'>
        <p>Results for {params.id}</p>
      </div>
    </div>
  );
};
