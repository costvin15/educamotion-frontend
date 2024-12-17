import React, { ElementRef, ComponentPropsWithoutRef } from 'react';

import { Root, Viewport, Corner, ScrollAreaScrollbar, ScrollAreaThumb } from '@radix-ui/react-scroll-area';
import { mergeClassNames } from '@/components/utils';

export const ScrollArea = React.forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, children, ...props }, ref) => (
    <Root
      ref={ref}
      className={mergeClassNames(className, 'relative overflow-hidden')}
      {...props}
    >
      <Viewport className='h-full w-full rounded-[inherit]'>
        {children}
      </Viewport>
      <ScrollBar />
      <Corner />
    </Root>
  )
);
ScrollArea.displayName = Root.displayName;

export const ScrollBar = React.forwardRef<ElementRef<typeof ScrollAreaScrollbar>, ComponentPropsWithoutRef<typeof ScrollAreaScrollbar>>(
  ({ className, orientation = 'vertical', ...props }, ref) => (
    <ScrollAreaScrollbar
      ref={ref}
      className={mergeClassNames(
        className,
        'flex touch-none select-none transition-colors',
        orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
        orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
      )}
      {...props}
    >
      <ScrollAreaThumb className='relative flex-1 rounded-full bg-border' />
    </ScrollAreaScrollbar>
  )
);
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
