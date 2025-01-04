export type Classroom = {
  id: string;
  userId: string;
  presentation: {
    id: string;
  }
  active: boolean;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
}
