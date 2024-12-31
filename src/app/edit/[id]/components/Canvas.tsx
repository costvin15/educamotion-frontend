import React, { useRef } from 'react';

import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';

import { useEditorStore } from "@/app/edit/[id]/store/editor";
import { SlideElement } from '@/app/edit/[id]/types/pages';
import { Draggable } from '@/app/edit/[id]/components/Draggable';
import { convertPercentilToPixel, convertPixelToPercentil } from '@/app/edit/[id]/utils/DimensionConverter';
import { Question } from '@/app/elements/question';
import { WordCloud } from '@/app/elements/WordCloud';
import { Cosmo } from '@/app/elements/Cosmo';
import { Elements } from '@/app/elements';

interface SlideElementProps extends React.HTMLAttributes<HTMLDivElement> {
  element: SlideElement;
  isSelected: boolean;
}

const ElementContainer = React.forwardRef<HTMLDivElement, SlideElementProps>((({ element, isSelected, ...props }, ref) => {
  const Element = Elements[element.elementType];

  return (
    <div className='sticky' style={{ top: element.positionY + '%', left: element.positionX + '%', width: element.width + '%', height: element.height + '%' }}>
      <Element element={element} />
    </div>
  );
}));

// const SlideElementComponent = React.forwardRef<HTMLDivElement, SlideElementProps>((({ element, isSelected, ...props }, ref) => (
//   // <Draggable
//   //   className={'absolute'}
//   //   ref={ref}
//     // id={element.id}
//     // style={{
//     //   top: element.y + '%',
//     //   left: element.x + '%',
//     //   width: element.width + '%',
//     //   height: element.height + '%',
//     // }}
//   // >
//     // <div
//     //   className={`w-full h-full ${isSelected && 'border-dashed border-4 border-secondary'}`}
//     //   style={{
//     //     ...element.style,
//     //     transform: `rotate(${element.rotation}deg)`,
//     //   }}
//     //   {...props}
//     // >
//     //   {element.type === SlideElementType.TEXT && <div className='w-full h-full' dangerouslySetInnerHTML={{ __html: element.content }} />}
//     //   {element.type === SlideElementType.IMAGE && <img className='w-full h-full' src={element.content} alt="" />}
//     //   {element.type === SlideElementType.SHAPE && <div className='w-full h-full' style={{ background: element.content }} />}
//     //   {element.type === SlideElementType.QUESTION && <Question element={element} />}
//     //   {element.type === SlideElementType.WORDCLOUD && <WordCloudElement element={element} />}
//     //   {element.type === SlideElementType.LEETCODE && <LeetCode element={element} />}
//     // </div>
//   // </Draggable>
// )));

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
    // const element = currentSlide.elements.find((element) => element.id === event.active.id);
    // if (!element) {
    //   throw new Error('Element not found');
    // }

    // const containerCoordinates : Size = {
    //   width: containerReference.current?.offsetWidth || 0,
    //   height: containerReference.current?.offsetHeight || 0,
    // };

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
            <ElementContainer key={index} element={element} isSelected={false} />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
