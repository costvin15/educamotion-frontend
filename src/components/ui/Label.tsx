import React, { ElementRef, ComponentPropsWithoutRef } from 'react';
import { Root } from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { mergeClassNames } from '@/components/utils';

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');

const Label = React.forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root> & VariantProps<typeof labelVariants>>(
  ({ className, ...props }, ref) => (
    <Root
      ref={ref}
      className={mergeClassNames(labelVariants(), className)}
      {...props}
    />
  ),
);
Label.displayName = Root.displayName;

export { Label };
