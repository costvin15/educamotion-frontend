import { create } from 'zustand';

import { Page, SlideElement } from '@/app/edit/[id]/types/pages';
import { SlideTemplate } from '@/app/edit/[id]/store/templates';

export interface EditorState {
  presentationId: string;
  slides: Page[];
  currentSlideIndex: number;
  selectedElement: string;
  setPresentationId: (id: string) => void;
  initializeSlides: (size: number) => void;
  addSlideInPosition: (slide: Page, position: number) => void;
  addSlideFromTemplate: (template: SlideTemplate) => void;
  updateSlide: (slide: Page) => void;
  removeSlide: (id: string) => void;
  setCurrentSlide: (index: number) => void;
  setSelectedElement: (id: string) => void;
  addElementToSlide: (element: SlideElement) => void;
  updateElement: (element: SlideElement) => void;
  reset: () => void;
}

const initialState: Page = {
  objectId: 'initial-slide',
  background: '',
  elements: [],
  isLoading: true,
};

export const useEditorStore = create<EditorState>((set) => ({
  presentationId: '',
  slides: [initialState],
  currentSlideIndex: 0,
  selectedElement: '',
  setPresentationId: (id) => set((state) => ({ presentationId: id })),
  initializeSlides: (size) => set((state) => ({
    slides: Array.from({ length: size }, (_, index) => ({
      objectId: index.toString(),
      background: '',
      elements: [],
      isLoading: true,
    })),
  })),
  addSlideInPosition: (slide, position) => set((state) => {
    const slides = [...state.slides];
    slides[position] = slide;
    slides[position].isLoading = false;
    return { slides };
  }),
  addSlideFromTemplate: (template) => set(
    (state) => ({
      slides: [
        ...state.slides.slice(0, state.currentSlideIndex + 1),
        {
          objectId: Date.now().toString(),
          elements: template.elements,
          background: '#ffffff',
          pageElements: [],
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
  removeSlide: (id) => set((state) => ({
    slides: state.slides.filter((slide) => slide.objectId !== id),
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
  reset: () => set((state) => ({ presentationId: 'initial-slide', slides: [initialState], thumbnails: {}, currentSlideIndex: 0 })),
}));
