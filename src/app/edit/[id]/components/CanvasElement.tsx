import { forwardRef, useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';

import client from '@/client';

import { Elements } from '@/app/elements';
import { SlideElement } from '@/app/edit/[id]/types/pages';

interface CanvasElementProps extends React.HTMLAttributes<HTMLDivElement> {
  element: SlideElement;
  isSelected: boolean;
  onSelect : () => void;
  onDragStop: (x: number, y: number) => void;
  onResizeStop: (width: number, height: number) => void;
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

export const CanvasElement = forwardRef<HTMLDivElement, CanvasElementProps>((({ element, onDragStop, onResizeStop, onSelect, isSelected, ...props }, ref) => {
  const Element = Elements[element.elementType];
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPosition({
      x: element.positionX,
      y: element.positionY,
    });
    setSize({
      width: element.width,
      height: element.height,
    });
  }, [element.id]);

  const onLoaded = () => {
    setLoading(false);
  }

  return (
    <Rnd
      className={isSelected ? 'border-4 border-dashed border-sky-500 rounded-lg' : ''}
      position={position}
      size={size}
      disableDragging={loading}
      enableResizing={!loading}
      onDragStart={onSelect}
      onResizeStart={onSelect}
      onDragStop={(e, d) => {
        onDragStop(d.x, d.y);
        setPosition({ x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        onDragStop(position.x, position.y);
        onResizeStop(size.width + delta.width, size.height + delta.height);
        setSize({ width: size.width + delta.width, height: size.height + delta.height });
        setPosition({ x: position.x, y: position.y });
      }}
      bounds={'parent'}
    >
      <div className='sticky w-full h-full'>
        <Element
          element={element}
          onLoaded={onLoaded}
        />
      </div>
      {isSelected && (
        <>
          <div className='w-3 h-3 top-[-5px] left-[-5px] bg-sky-500 rounded-full absolute'></div>
          <div className='w-3 h-3 top-[-5px] right-[-5px] bg-sky-500 rounded-full absolute'></div>
          <div className='w-3 h-3 bottom-[-5px] left-[-5px] bg-sky-500 rounded-full absolute'></div>
          <div className='w-3 h-3 bottom-[-5px] right-[-5px] bg-sky-500 rounded-full absolute'></div>
        </>
      )}
    </Rnd>
  );
}));
