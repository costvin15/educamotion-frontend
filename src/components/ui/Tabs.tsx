'use client';
import React, { ElementRef, ComponentPropsWithoutRef } from 'react';

import { Root, List, Trigger, Content } from '@radix-ui/react-tabs';
import { mergeClassNames } from '@/components/utils';

export const Tabs = Root;
Tabs.displayName = Root.displayName;

export const TabsList = React.forwardRef<ElementRef<typeof List>, ComponentPropsWithoutRef<typeof List>>(
  ({ className, ...props }, ref) => (
    <List
      ref={ref}
      className={mergeClassNames(
        className,
        'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground'
      )}
      {...props}
    />
  )
);
TabsList.displayName = List.displayName;

export const TabsTrigger = React.forwardRef<ElementRef<typeof Trigger>, ComponentPropsWithoutRef<typeof Trigger>>(
  ({ className, ...props }, ref) => (
    <Trigger
      ref={ref}
      className={mergeClassNames(
        className,
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm'
      )}
      {...props}
    />
  )
);
TabsTrigger.displayName = Trigger.displayName;

export const TabsContent = React.forwardRef<ElementRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(
  ({ className, ...props }, ref) => (
    <Content
      ref={ref}
      className={mergeClassNames(
        className,
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
      )}
      {...props}
    />
  )
);
TabsContent.displayName = Content.displayName;
