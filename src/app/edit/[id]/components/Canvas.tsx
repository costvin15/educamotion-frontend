import React, { useEffect, useRef, useState } from 'react';

import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';

import { useEditorStore } from "@/app/edit/[id]/store/editor";
import { CanvasElement, updateElementData } from '@/app/edit/[id]/components/CanvasElement';

export function Canvas() {
  const containerReference = useRef<HTMLDivElement | null>(null);
  const { slides, currentSlideIndex, selectedElement, updateSlide, setSelectedElement, updateElement } = useEditorStore();
  const currentSlide = slides[currentSlideIndex];

  if (!currentSlide) {
    return null;
  }

  // const updateElementPosition = ({ element, container, delta } : { element: SlideElement, container: Size, delta: Coordinate }) : Coordinate => {
  //   const pixelPosition = convertPercentilToPixel({ element, container });
  //   const updatePosition = {
  //     x: pixelPosition.x + delta.x,
  //     y: pixelPosition.y + delta.y,
  //   };
  //   return convertPixelToPercentil({ element: updatePosition, container });
  // }

  const handleDragStart = (event: DragStartEvent) => {
    setSelectedElement(String(event.active.id));
  };

  const handleDragElement = (event: DragEndEvent) => {
    const element = currentSlide.elements.find((element) => element.id === event.active.id);
    if (!element) {
      throw new Error('Element not found');
    }
    const updatedElement = {
      ...element,
      positionX: element.positionX + event.delta.x,
      positionY: element.positionY + event.delta.y,
    };

    updateElementData(updatedElement, { x: updatedElement.positionX, y: updatedElement.positionY }, { width: updatedElement.width, height: updatedElement.height });

    updateSlide({
      ...currentSlide,
      elements: currentSlide.elements.map((currentElement) => {
        if (currentElement.id === updatedElement.id) {
          return updatedElement;
        }
        return currentElement;
      }),
    });

    // const elementUpdated = updateElementPosition({ element, container: containerCoordinates, delta: event.delta });
    // const updatedElements = currentSlide.elements.map((currentElement) => {
    //   if (currentElement.id === element.id) {
    //     return {
    //       ...currentElement,
    //       x: elementUpdated.x,
    //       y: elementUpdated.y,
    //     };
    //   }
    //   return currentElement;
    // });

    // updateSlide({
    //   ...currentSlide,
    //   elements: updatedElements,
    // });
  };

  return (
    <div
      className='flex h-full items-center justify-center bg-muted p-8'
      onClick={() => setSelectedElement('')}
    >
      <div
        ref={containerReference}
        className='relative aspect-video w-full max-w-5xl rounded-lg shadow-lg bg-white overflow-hidden'
        style={{
          backgroundImage: `url(${currentSlide.background})`,
          backgroundSize: 'cover',
        }}
        onClick={() => setSelectedElement('')}
      >
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragElement}
          modifiers={[restrictToParentElement]}
        >
          {currentSlide.elements.map((element, index) => (
            <CanvasElement
              key={index}
              element={element}
              isSelected={selectedElement === element.id}
              onClick={() => setSelectedElement(element.id)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
