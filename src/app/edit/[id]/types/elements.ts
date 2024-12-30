import { Dimension } from "@/app/components/types/Dimension";
import { Transform } from "@/app/components/types/Transform";

export interface Element {
  objectId: string;
  size?: Dimension;
  transform?: Transform;
};

export interface ImageElement extends Element {
  image: {
    contentUrl: string;
    imageProperties: {};
  }
};
