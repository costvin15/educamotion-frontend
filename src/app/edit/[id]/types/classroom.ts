export type Classroom = {
  id: string;
  userId: string;
  presentation: {
    id: string;
  }
  active: boolean;
  entryCode: string;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
}
