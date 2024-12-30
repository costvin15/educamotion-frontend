export interface Presentation {
  id: string;
  title: string;
}

export interface Presentations {
  presentations: Presentation[];
  nextPageToken: string;
}
