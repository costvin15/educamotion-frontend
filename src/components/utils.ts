import { clsx, type ClassValue } from 'clsx';
import { twMerge as tailwindMerge } from 'tailwind-merge';

export function mergeClassNames(...classNames: ClassValue[]) {
  return tailwindMerge(clsx(classNames));
}
