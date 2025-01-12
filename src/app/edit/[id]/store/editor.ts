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
  updateSlide: (slide: Page) => void;
  removeSlide: (id: string) => void;
  setCurrentSlide: (index: number) => void;
  setSelectedElement: (id: string) => void;
  addElementToSlide: (element: SlideElement) => void;
  removeElementFromSlide: (elementId: string) => void;
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
  removeElementFromSlide: (elementId) => set((state) => ({
    slides: state.slides.map(
      (currentSlide, index) => (
        index === state.currentSlideIndex ? {
          ...currentSlide,
          elements: currentSlide.elements.filter((element) => element.id !== elementId),
        } : currentSlide
      )
    ),
  })),
  reset: () => set((state) => ({ presentationId: 'initial-slide', slides: [initialState], thumbnails: {}, currentSlideIndex: 0 })),
}));
