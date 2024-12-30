export enum InteractionType {
  FORM_SUBMIT = 'Submissão de Formulário',
  BUTTON_CLICK = 'Clique em Botão',
  PAGE_VIEW = 'Visualização de Página',
  COSMO = 'Cosmo',
  CHAT_MESSAGE = 'Mensagem de Chat',
}

export interface InteractionLog {
  id: string;
  viewerId: string;
  viewerName: string;
  type: InteractionType;
  element: string;
  timestamp: Date;
  data?: Record<string, any>;
};
