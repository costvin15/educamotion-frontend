'use client';
import React, { ElementRef, ComponentPropsWithoutRef } from 'react';
import {
  Root as DropdownMenu,
  Trigger as DropdownMenuTrigger,
  Portal,
  Content as DropdownMenuContentRoot,
  Item as DropdownMenuItemRoot
} from '@radix-ui/react-dropdown-menu';

import { mergeClassNames } from '@/components/utils';

const DropdownMenuContent = React.forwardRef<ElementRef<typeof DropdownMenuContentRoot>, ComponentPropsWithoutRef<typeof DropdownMenuContentRoot>>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <Portal>
      <DropdownMenuContentRoot
        ref={ref}
        sideOffset={sideOffset}
        className={mergeClassNames(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </Portal>
  )
);
DropdownMenuContent.displayName = DropdownMenuContentRoot.displayName;

const DropdownMenuItem = React.forwardRef<ElementRef<typeof DropdownMenuItemRoot>, ComponentPropsWithoutRef<typeof DropdownMenuItemRoot> & { inset?: boolean }>(
  ({ className, inset, ...props }, ref) => (
    <DropdownMenuItemRoot
      ref={ref}
      className={mergeClassNames(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  )
);
DropdownMenuItem.displayName = DropdownMenuItemRoot.displayName;

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
};
