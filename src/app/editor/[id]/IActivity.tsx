export type Presentation = {
  presentationId: string;
};

export default interface Activity {
  presentation: Presentation;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};