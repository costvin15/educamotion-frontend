import { Coordinate, Size, SlideElement } from "@/app/edit/[id]/types/pages";

export const convertPercentilToPixel = ({ element, container } : { element: SlideElement, container: Size }) : Coordinate => {
  return {
    x: (element.x * container.width) / 100,
    y: (element.y * container.height) / 100,
  }
}

export const convertPixelToPercentil = ({ element, container } : { element: Coordinate, container: Size }) : Coordinate => {
  const xPercentil = Math.max(0, (element.x * 100) / container.width);
  const yPercentil = Math.max(0, (element.y * 100) / container.height);

  return {
    x: Math.round(xPercentil * 100) / 100,
    y: Math.round(yPercentil * 100) / 100,
  }
}
