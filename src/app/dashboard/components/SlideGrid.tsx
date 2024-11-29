import { Slide } from "@/app/dashboard/types/slides";

interface SlideGridProps {
  slides: Slide[];
}

export function SlideGrid ({ slides } : SlideGridProps) {
  return (
    <p>SlideGrid</p>
  );
}
