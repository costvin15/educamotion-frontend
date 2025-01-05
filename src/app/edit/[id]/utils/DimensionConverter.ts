import { SlideElement } from "@/app/edit/[id]/types/pages";

export const convertPositionAsPercentilToPixel = (element: SlideElement, container: { width: number, height: number}) : { x: number, y: number } => {
  return {
    x: (element.positionX * container.width) / 100,
    y: (element.positionY * container.height) / 100,
  }
}

export const convertPositionAsPixelToPercentil = (element: SlideElement, container: { width: number, height: number}) : { x: number, y: number } => {
  const xPercentil = Math.max(0, (element.positionX * 100) / container.width);
  const yPercentil = Math.max(0, (element.positionY * 100) / container.height);

  return {
    x: Math.round(xPercentil * 100) / 100,
    y: Math.round(yPercentil * 100) / 100,
  }
}

export const convertSizeAsPercentilToPixel = (element: SlideElement, container: { width: number, height: number}) : { width: number, height: number } => {
  return {
    width: (element.width * container.width) / 100,
    height: (element.height * container.height) / 100,
  }
}

export const convertSizeAsPixelToPercentil = (element: SlideElement, container: { width: number, height: number}) : { width: number, height: number } => {
  const widthPercentil = (element.width * 100) / container.width;
  const heightPercentil = (element.height * 100) / container.height;
  return {
    width: Math.min(100, widthPercentil),
    height: Math.min(100, heightPercentil),
  }
}
