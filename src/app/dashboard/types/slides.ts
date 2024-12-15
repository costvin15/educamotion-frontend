export interface Slide {
  presentationId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Slides {
  total: number;
  presentations: Slide[];
}

export enum SortOptions {
  Name = 'Name',
  MostRecentOpened = 'MostRecentOpened',
  Date = 'Date',
}
