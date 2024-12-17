export interface Page {
  objectId: string;
  elements: SlideElement[];
}

export interface Pages {
  presentationId: string;
  slides: Page[];
  title: string;
  totalSlides: number;
}

export enum SlideElementType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  SHAPE = 'SHAPE',
}

export interface SlideElement {
  id: string;
  type: SlideElementType;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  style?: {
    color?: string;
    fontSize?: number;
    fontFamily?: string;
    backgroundColor?: string;
    opacity?: number;
  };
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}
