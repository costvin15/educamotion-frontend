'use client';
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { X, Menu } from 'lucide-react';

export function Navbar({ children } : Readonly<{ children: ReactNode }>) {
  const [ isOpen, setIsOpen ] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 no-underline text-current">
            <img src="/static/images/educamotion-logo.png" alt="EducaMotion" className="w-8 h-8" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {children}
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
              {children}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
