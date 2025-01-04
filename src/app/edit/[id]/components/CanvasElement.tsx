import { forwardRef, useState, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import client from '@/client';

import { Elements } from '@/app/elements';
import { SlideElement } from '@/app/edit/[id]/types/pages';
import { ResizablePanel } from '@/app/edit/[id]/components/ResizablePanel';

interface CanvasElementProps extends React.HTMLAttributes<HTMLDivElement> {
  element: SlideElement;
  isSelected: boolean;
}

export const updateElementData = async (element: SlideElement, position: { x: number, y: number }, size: { width: number, height: number }) => {
    await client.put(`/element/update`, {
        elementId: element.id,
        positionX: position.x,
        positionY: position.y,
        width: size.width,
        height: size.height,
    });
};

export const CanvasElement = forwardRef<HTMLDivElement, CanvasElementProps>((({ element, isSelected, ...props }, ref) => {
  const Element = Elements[element.elementType];
  const [width, setWidth] = useState(element.width);
  const [height, setHeight] = useState(element.height);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: element.id });

  useEffect(() => {
    updateElementData(element, { x: element.positionX, y: element.positionY }, { width, height });
  }, [width, height]);

  return (
    <div
      className='absolute'
      ref={setNodeRef}
      style={{
        top: element.positionY,
        left: element.positionX,
        transform: CSS.Translate.toString(transform),
      }}
      {...props}
    >
      <ResizablePanel
        isSelected={isSelected}
        width={width}
        height={height}
        onSizeChange={(width, height) => {
          setWidth(width);
          setHeight(height);
        }}
      >
        <div
          className='sticky w-full h-full'
          {...attributes}
          {...listeners}
        >
          <Element element={element} />
        </div>
      </ResizablePanel>
    </div>
  );
}));
