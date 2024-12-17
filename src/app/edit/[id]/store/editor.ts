import { create } from 'zustand';

import { Page, SlideElement, SlideElementType } from '@/app/edit/[id]/types/pages';
import { SlideTemplate } from '@/app/edit/[id]/store/templates';

export interface EditorState {
  presentationId: string;
  slides: Page[];
  thumbnails: { [key: string]: string };
  currentSlideIndex: number;
  selectedElement: string;
  setPresentationId: (id: string) => void;
  addSlides: (slides: Page[]) => void;
  addSlideFromTemplate: (template: SlideTemplate) => void;
  updateSlide: (slide: Page) => void;
  addThumbnail: (slide: Page, thumbnail: string) => void;
  setCurrentSlide: (index: number) => void;
  setSelectedElement: (id: string) => void;
  addElementToSlide: (element: SlideElement) => void;
  updateElement: (element: SlideElement) => void;
  reset: () => void;
}

const initialState: Page = {
  objectId: '',
  elements: [],
};

export const useEditorStore = create<EditorState>((set) => ({
  presentationId: '',
  slides: [initialState],
  thumbnails: {},
  currentSlideIndex: 0,
  selectedElement: '',
  setPresentationId: (id) => set((state) => ({ presentationId: id })),
  addSlides: (slides) => set((state) => ({
    slides: slides.map((slide) => ({
      ...slide,
      elements: []
    })),
  })),
  addSlideFromTemplate: (template) => set(
    (state) => ({
      slides: [
        ...state.slides.slice(0, state.currentSlideIndex + 1),
        {
          objectId: Date.now().toString(),
          elements: template.elements,
          background: '#ffffff',
        },
        ...state.slides.slice(state.currentSlideIndex + 1),
      ],
      currentSlideIndex: state.currentSlideIndex + 1,
    })
  ),
  updateSlide: (slide) => set((state) => ({
    slides: state.slides.map(
      (currentSlide) => (currentSlide.objectId === slide.objectId ? slide : currentSlide)
    ),
  })),
  addThumbnail: (slide, thumbnail) => set((state) => ({
    slides: state.slides.map(
      (currentSlide) => (
        currentSlide.objectId === slide.objectId ? {
          ...currentSlide,
          elements: [
            ...currentSlide.elements,
            {
              id: Date.now().toString(),
              type: SlideElementType.IMAGE,
              content: thumbnail,
              x: 0,
              y: 0,
              width: 100,
              height: 100,
              rotation: 0,
            },
          ]
        } : currentSlide
      )),
    thumbnails: { ...state.thumbnails, [slide.objectId]: thumbnail }
  })),
  setCurrentSlide: (index) => set((state) => ({ currentSlideIndex: index })),
  setSelectedElement: (id) => set((state) => ({ selectedElement: id })),
  addElementToSlide: (element: SlideElement) => set((state) => ({
    slides: state.slides.map(
      (currentSlide, index) => (
        index === state.currentSlideIndex ? {
          ...currentSlide,
          elements: [...currentSlide.elements, element],
        } : currentSlide
      )
    ),
  })),
  updateElement: (element) => set((state) => ({
    slides: state.slides.map(
      (currentSlide, index) => (
        index === state.currentSlideIndex ? {
          ...currentSlide,
          elements: currentSlide.elements.map(
            (currentElement) => (
              currentElement.id === element.id ? element : currentElement
            )
          ),
        } : currentSlide
      )
    ),
  })),
  reset: () => set((state) => ({ presentationId: '', slides: [initialState], thumbnails: {}, currentSlideIndex: 0 })),
}));
