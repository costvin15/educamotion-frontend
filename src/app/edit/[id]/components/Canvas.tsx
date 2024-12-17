import React, { useRef } from 'react';

import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { snapCenterToCursor, restrictToParentElement } from '@dnd-kit/modifiers';

import { useEditorStore } from "@/app/edit/[id]/store/editor";
import { Coordinate, Size, SlideElement, SlideElementType } from '@/app/edit/[id]/types/pages';
import { Draggable } from '@/app/edit/[id]/components/Draggable';
import { convertPercentilToPixel, convertPixelToPercentil } from '@/app/edit/[id]/utils/DimensionConverter';
import { CSS } from '@dnd-kit/utilities';

interface SlideElementProps extends React.HTMLAttributes<HTMLDivElement> {
  element: SlideElement;
}

const SlideElementComponent = React.forwardRef<HTMLDivElement, SlideElementProps>((({ element, ...props }, ref) => (
  <Draggable
    className='relative'
    ref={ref}
    id={element.id}
    style={{
      top: element.y + '%',
      left: element.x + '%',
      width: element.width + '%',
      height: element.height + '%',
    }}
  >
    <div
      style={{
        ...element.style,
      }}
    >
      {element.type === SlideElementType.TEXT && <div dangerouslySetInnerHTML={{ __html: element.content }} />}
      {element.type === SlideElementType.IMAGE && <img src={element.content} alt="" />}
      {element.type === SlideElementType.SHAPE && <div style={{ background: element.content }} />}
    </div>
  </Draggable>
)));

export function Canvas() {
  const containerReference = useRef<HTMLDivElement | null>(null);
  const { slides, currentSlideIndex, updateSlide } = useEditorStore();
  const currentSlide = slides[currentSlideIndex];

  const updateElementPosition = ({ element, container, delta } : { element: SlideElement, container: Size, delta: Coordinate }) : Coordinate => {
    const pixelPosition = convertPercentilToPixel({ element, container });
    const updatePosition = {
      x: pixelPosition.x + delta.x,
      y: pixelPosition.y + delta.y,
    };
    return convertPixelToPercentil({ element: updatePosition, container });
  }

  const handleDragElement = (event: DragEndEvent) => {
    const element = currentSlide.elements.find((element) => element.id === event.active.id);
    if (!element) {
      throw new Error('Element not found');
    }

    const containerCoordinates : Size = {
      width: containerReference.current?.offsetWidth || 0,
      height: containerReference.current?.offsetHeight || 0,
    };

    const elementUpdated = updateElementPosition({ element, container: containerCoordinates, delta: event.delta });
    const updatedElements = currentSlide.elements.map((currentElement) => {
      if (currentElement.id === element.id) {
        return {
          ...currentElement,
          x: elementUpdated.x,
          y: elementUpdated.y,
        };
      }
      return currentElement;
    });

    updateSlide({
      ...currentSlide,
      elements: updatedElements,
    });
  };

  return (
    <div className='flex h-full items-center justify-center bg-muted p-8'>
      <div ref={containerReference} className='aspect-video w-full max-w-5xl rounded-lg shadow-lg bg-white overflow-hidden'>
        <DndContext
          onDragEnd={handleDragElement}
          modifiers={[snapCenterToCursor, restrictToParentElement]}
        >
          {currentSlide.elements.map((element, index) => (
            <SlideElementComponent
              key={index}
              element={element}
              className='relative'
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
