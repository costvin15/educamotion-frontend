import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Root, Item, Indicator } from '@radix-ui/react-radio-group';
import { mergeClassNames } from '@/components/utils';
import { Circle } from "lucide-react";

export const RadioGroup = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => (
    <Root
      ref={ref}
      className={mergeClassNames(className, 'grid gap-2')}
      {...props}
    />
  )
);
RadioGroup.displayName = 'RadioGroup';

export const RadioGroupItem = forwardRef<ElementRef<typeof Item>, ComponentPropsWithoutRef<typeof Item>>(
  ({ className, ...props }, ref) => (
    <Item
      ref={ref}
      className={mergeClassNames(className, 'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50')}
      {...props}
    >
      <Indicator className='flex items-center justify-center'>
        <Circle className='h-2.5 w-2.5 fill-current text-current' />
      </Indicator>
    </Item>
  )
);
RadioGroupItem.displayName = 'RadioGroupItem';
