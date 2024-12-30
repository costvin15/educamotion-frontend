import React from "react";
import { Layout, Type } from 'lucide-react';

import { SlideElement } from "@/app/edit/[id]/types/pages";

export interface SlideTemplate {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
  elements: SlideElement[];
}

export const SlideTemplates : SlideTemplate[] = [
  {
    id: 'blank',
    name: 'Slide em branco',
    description: 'Slide em branco para você criar do zero',
    preview: <Layout className='h-full w-full p-4 text-muted-foreground' />,
    elements: []
  },
  // {
  //   id: 'title',
  //   name: 'Slide de título',
  //   description: 'Slide com um título e subtítulo',
  //   preview: <Type className='h-full w-full p-4 text-muted-foreground' />,
  //   elements: [
  //     {
  //       id: 'title',
  //       type: SlideElementType.TEXT,
  //       content: 'Clique para alterar o título',
  //       x: 100,
  //       y: 200,
  //       width: 600,
  //       height: 80,
  //       rotation: 0,
  //       style: {
  //         fontSize: 48,
  //         fontFamily: 'Inter',
  //         color: '#000000',
  //       },
  //     },
  //     {
  //       id: 'subtitle',
  //       type: SlideElementType.TEXT,
  //       content: 'Clique para alterar o subtítulo',
  //       x: 100,
  //       y: 300,
  //       width: 600,
  //       height: 40,
  //       rotation: 0,
  //       style: {
  //         fontSize: 24,
  //         fontFamily: 'Inter',
  //         color: '#666666',
  //       },
  //     }
  //   ]
  // }
];
