'use client';
import { useEffect } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";

import { useResultsStore } from "@/app/results/[id]/store";

import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/ui/NavBar";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

import QuestionReport from '@/app/elements/question/report';

export default function ResultsLayout({ params } : { params : { id: string }}) {
  const store = useResultsStore();

  useEffect(() => {
    store.setPresentationId(params.id);
  }, []);

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

      <div className='grid grid-cols-4 gap-4 p-4'>
        <QuestionReport presentationId={params.id} />
      </div>
    </div>
  );
};
