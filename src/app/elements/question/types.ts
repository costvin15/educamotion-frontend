export interface Question {
  id: string;
  title: string;
  description: string;
  type: string;
  options: string[];
  correctAnswer: string;
}
