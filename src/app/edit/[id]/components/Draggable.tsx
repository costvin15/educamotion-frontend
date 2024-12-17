import React from 'react';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface DraggableProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
}

export const Draggable = React.forwardRef<HTMLDivElement, DraggableProps>(
  ({ id, style, ...props}, ref) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

    return (
      <div
        ref={setNodeRef}
        style={{
          ...style,
          transform: CSS.Translate.toString(transform),
        }}
        {...props}
        {...attributes}
        {...listeners}
      />
    )
  }
);
