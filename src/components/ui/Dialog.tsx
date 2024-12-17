import React, { ElementRef, ComponentPropsWithoutRef } from 'react';
import { Root, Trigger, Portal, Close, Overlay, Content, Title } from '@radix-ui/react-dialog';
import { mergeClassNames } from '@/components/utils';
import { X } from 'lucide-react';

export const Dialog = Root;
Dialog.displayName = Root.displayName;

export const DialogTrigger = Trigger;
DialogTrigger.displayName = Trigger.displayName;

export const DialogPortal = Portal;
DialogPortal.displayName = Portal.displayName;

export const DialogClose = Close;
DialogClose.displayName = Close.displayName;

export const DialogOverlay = React.forwardRef<ElementRef<typeof Overlay>, ComponentPropsWithoutRef<typeof Overlay>>(
  ({ className, ...props }, ref) => (
    <Overlay
      ref={ref}
      className={mergeClassNames(
        className,
        'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      )}
      {...props}
    />
  )
);
DialogOverlay.displayName = Overlay.displayName;

export const DialogContent = React.forwardRef<ElementRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(
  ({ className, children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <Content
        ref={ref}
        className={mergeClassNames(
          className,
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        )}
        {...props}
      >
        {children}
        <DialogClose
          className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'
        >
          <X className='h-4 w-4' />
          <span className='sr-only'>Fechar</span>
        </DialogClose>
      </Content>
    </DialogPortal>
  )
);
DialogContent.displayName = Content.displayName;

export const DialogHeader = ({ className, ...props} : React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={mergeClassNames(
      className,
      'flex flex-col space-y-1.5 text-center sm:text-left',
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

export const DialogTitle = React.forwardRef<ElementRef<typeof Title>, ComponentPropsWithoutRef<typeof Title>>(
  ({ className, ...props }, ref) => (
    <Title
      ref={ref}
      className={mergeClassNames(
        className,
        'text-lg font-semibold leading-none tracking-tight'
      )}
      {...props }
    />
  )
);
DialogTitle.displayName = Title.displayName;
