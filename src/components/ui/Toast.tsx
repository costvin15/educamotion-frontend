import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { Root, Provider, Title, Description, Close, Viewport } from '@radix-ui/react-toast';

import { mergeClassNames } from '@/components/utils';
import { X } from 'lucide-react';

const toastVariants = cva(
  'mt-1 group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive: 'destructive group border-destructive bg-destructive text-destructive-foreground'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export const ToastProvider = Provider;
ToastProvider.displayName = Provider.displayName;

export const Toast = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root> & VariantProps<typeof toastVariants>>(
  ({ className, variant, ...props }, ref) => (
    <Root
      ref={ref}
      className={mergeClassNames(className, toastVariants({ variant }))}
      {...props}
    />
  )
);
Toast.displayName = Root.displayName;

export const ToastTitle = forwardRef<ElementRef<typeof Title>, ComponentPropsWithoutRef<typeof Title>>(
  ({ className, ...props }, ref) => (
    <Title
      ref={ref}
      className={mergeClassNames(className, 'text-sm font-semibold')}
      {...props}
    />
  )
);
ToastTitle.displayName = Title.displayName;

export const ToastDescription = forwardRef<ElementRef<typeof Description>, ComponentPropsWithoutRef<typeof Description>>(
  ({ className, ...props }, ref) => (
    <Description
      ref={ref}
      className={mergeClassNames(className, 'text-sm opacity-90')}
      {...props}
    />
  )
);

export const ToastClose = forwardRef<ElementRef<typeof Close>, ComponentPropsWithoutRef<typeof Close>>(
  ({ className, ...props }, ref) => (
    <Close
      ref={ref}
      className={mergeClassNames(
        className,
        'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600'
      )}
      {...props}
    >
      <X className='w-4 h-4' />
    </Close>
  )
);
ToastClose.displayName = Close.displayName;

export const ToastViewport = forwardRef<ElementRef<typeof Viewport>, ComponentPropsWithoutRef<typeof Viewport>>(
  ({ className, ...props }, ref) => (
    <Viewport
      ref={ref}
      className={mergeClassNames(className, 'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]')}
      {...props}
    />
  )
);
ToastViewport.displayName = Viewport.displayName;

export type ToastProps = ComponentPropsWithoutRef<typeof Toast>;
