export interface Page {
  objectId: string;
}

export interface Pages {
  presentationId: string;
  slides: Page[];
  title: string;
  totalSlides: number;
}
