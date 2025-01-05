import React, { useEffect, useRef, useState } from 'react';

import { useEditorStore } from "@/app/edit/[id]/store/editor";
import { CanvasElement, updateElementData } from '@/app/edit/[id]/components/CanvasElement';
import { convertPositionAsPercentilToPixel, convertPositionAsPixelToPercentil, convertSizeAsPercentilToPixel, convertSizeAsPixelToPercentil } from '../utils/DimensionConverter';

export function Canvas() {
  const containerReference = useRef<HTMLDivElement | null>(null);
  const { slides, currentSlideIndex, selectedElement, updateSlide, setSelectedElement } = useEditorStore();
  const currentSlide = slides[currentSlideIndex];

  if (!currentSlide) {
    return null;
  }

  const getContainerSize = () => {
    if (!containerReference.current) {
      return null;
    }

    return {
      width: containerReference.current.offsetWidth || 1024,
      height: containerReference.current.offsetHeight || 720,
    };
  }

  const handleDragElement = (elementId: string, x: number, y: number) => {
    const element = currentSlide.elements.find((element) => element.id === elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    const containerCoordinates = getContainerSize();
    if (!containerCoordinates) {
      return;
    }
    const updatedElement = {
      ...element,
      positionX: x,
      positionY: y,
    };
    const positionAsPercentil = convertPositionAsPixelToPercentil(updatedElement, containerCoordinates);

    updateElementData(updatedElement, { x: positionAsPercentil.x, y: positionAsPercentil.y }, { width: updatedElement.width, height: updatedElement.height });

    updateSlide({
      ...currentSlide,
      elements: currentSlide.elements.map((currentElement) => {
        if (currentElement.id === updatedElement.id) {
          return {
            ...currentElement,
            positionX: positionAsPercentil.x,
            positionY: positionAsPercentil.y,
          };
        }
        return currentElement;
      }),
    });
  };

  const handleResizeElement = (elementId: string, width: number, height: number) => {
    const element = currentSlide.elements.find((element) => element.id === elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    const containerCoordinates = getContainerSize();
    if (!containerCoordinates) {
      return;
    }
    const updatedElement = {
      ...element,
      width,
      height,
    };

    const sizeAsPercentil = convertSizeAsPixelToPercentil(updatedElement, containerCoordinates);
    updateElementData(updatedElement, { x: updatedElement.positionX, y: updatedElement.positionY }, { width: sizeAsPercentil.width, height: sizeAsPercentil.height });
    updateSlide({
      ...currentSlide,
      elements: currentSlide.elements.map((currentElement) => {
        if (currentElement.id === updatedElement.id) {
          return {
            ...currentElement,
            width: sizeAsPercentil.width,
            height: sizeAsPercentil.height,
          };
        }
        return currentElement;
      }),
    });
  };

  return (
    <div
      className='flex h-full items-center justify-center bg-muted p-8'
    >
      <div
        ref={containerReference}
        className='relative aspect-video w-full max-w-5xl rounded-lg shadow-lg bg-white overflow-hidden'
        style={{
          backgroundImage: `url(${currentSlide.background})`,
          backgroundSize: 'cover',
        }}
      >
        {currentSlide.elements.map((element, index) => {
          const containerSize = getContainerSize();
          if (!containerSize) {
            return <div key={element.id}></div>;
          }
          const { x, y } = convertPositionAsPercentilToPixel(element, containerSize);
          const { width, height } = convertSizeAsPercentilToPixel(element, containerSize);
          const currentElement = {
            ...element,
            positionX: x,
            positionY: y,
            width,
            height,
          };

          return (
            <CanvasElement
              key={element.id}
              element={currentElement}
              onDragStop={(x, y) => handleDragElement(currentElement.id, x, y)}
              onResizeStop={(width, height) => {
                handleResizeElement(currentElement.id, width, height);
              }}
              isSelected={selectedElement === currentElement.id}
              onSelect={() => setSelectedElement(currentElement.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
