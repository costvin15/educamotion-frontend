export interface Slide {
  id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  lastModified: string;
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
