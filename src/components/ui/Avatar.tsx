import React, { ComponentPropsWithoutRef, ElementRef } from 'react';
import { Root as AvatarRoot, Image as AvatarImageRoot, Fallback as AvatarFallbackRoot } from '@radix-ui/react-avatar';

import { mergeClassNames } from '@/components/utils';

const Avatar = React.forwardRef<ElementRef<typeof AvatarRoot>, ComponentPropsWithoutRef<typeof AvatarRoot>>(
  ({ className, ...props }, ref) => (
    <AvatarRoot
      ref={ref}
      className={mergeClassNames('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  )
);
Avatar.displayName = AvatarRoot.displayName;

const AvatarImage = React.forwardRef<ElementRef<typeof AvatarImageRoot>, ComponentPropsWithoutRef<typeof AvatarImageRoot>>(
  ({ className, ...props }, ref) => (
    <AvatarImageRoot
      ref={ref}
      className={mergeClassNames('aspect-square h-full w-full', className)}
      {...props}
    />
  )
);
AvatarImage.displayName = AvatarImageRoot.displayName;

const AvatarFallback = React.forwardRef<ElementRef<typeof AvatarFallbackRoot>, ComponentPropsWithoutRef<typeof AvatarFallbackRoot>>(
  ({ className, ...props }, ref) => (
    <AvatarFallbackRoot
      ref={ref}
      className={mergeClassNames('flex h-full w-full items-center justify-center rounded-full bg-muted', className)}
      {...props}
    />
  )
);
AvatarFallback.displayName = AvatarFallbackRoot.displayName;

export { Avatar, AvatarImage, AvatarFallback };
