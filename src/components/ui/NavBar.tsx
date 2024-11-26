'use client';
import { useState } from 'react';
import Link from 'next/link';
import { X, Menu } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';

export function Navbar() {
  const [ isOpen, setIsOpen ] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 no-underline text-current">
            <span className="text-2xl font-bold">EducaMotion</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors no-underline">
              Funcionalidades
            </Link>
            <Link href="#resources" className="text-muted-foreground hover:text-foreground transition-colors no-underline">
              Recursos
            </Link>
            <ThemeSwitcher />
            <Button size="lg" className="text-lg">
              Comece a Ensinar
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              Veja Exemplos
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Funcionalidades
              </Link>
              <Link
                href="#resources"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Recursos
              </Link>
              <Button variant="outline" className="w-full">Já tem uma conta?</Button>
              <Button className="w-full">Comece agora</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
