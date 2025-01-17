import { ElementType } from "@/app/elements";

export interface Classroom {
  id: string;
  presentation: {
    id: string;
    title: string;
  },
  active: boolean;
  currentSlide: string | null;
};

export interface SlideElement {
  id: string;
  elementType: ElementType;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
};

export interface DetailPresentation {
  id: string;
  title: string;
  thumbnail: string;
  lastModified: string;
  slidesIds: string[];
  elements: Record<string, SlideElement[]>;
};

export interface Page {
  objectId: string;
  background: string;
  elements: SlideElement[];
};
