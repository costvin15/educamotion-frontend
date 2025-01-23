import { forwardRef, HTMLAttributes, ReactNode } from "react";

import { cva, VariantProps } from "class-variance-authority";

import { Button } from "@/components/ui/Button";
import { mergeClassNames } from "@/components/utils";
import { Plus } from "lucide-react";

const fabVariants = cva(
  'fixed shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95',
  {
    variants: {
      position: {
        "bottom-right": "bottom-6 right-6",
        "bottom-left": "bottom-6 left-6",
        "top-right": "top-6 right-6",
        "top-left": "top-6 left-6",
      },
      size: {
        default: "h-14 w-14",
        sm: "h-12 w-12",
        lg: "h-16 w-16",
      }
    },
    defaultVariants: {
      position: "bottom-right",
      size: "default",
    }
  }
);

interface FloatingActionButtonProps extends HTMLAttributes<HTMLButtonElement>, VariantProps<typeof fabVariants> {
  icon?: ReactNode;
}

export const FloatingActionButton = forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  ({ className, position, size, icon, ...props }, ref) => (
    <Button
      ref={ref}
      variant='default'
      className={mergeClassNames(
        fabVariants({ position, size }),
        'rounded-full p-0',
        className
      )}
      {...props}
    >
      {icon || <Plus className='h-6 w-6' />}
    </Button>
  )
);
FloatingActionButton.displayName = 'FloatingActionButton';

