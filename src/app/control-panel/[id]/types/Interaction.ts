export enum InteractionType {
  FORM_SUBMIT = 'Submissão de Formulário',
  BUTTON_CLICK = 'Clique em Botão',
  PAGE_VIEW = 'Visualização de Página',
  COSMO = 'Cosmo',
  QUESTION = 'Questão respondida',
  MESSAGE = 'Mensagem de Chat',
  WORD_CLOUD = 'Adicionou uma palavra na nuvem',
}

export interface InteractionLog {
  id: string;
  viewerId: string;
  viewerName: string;
  type: InteractionType;
  timestamp: Date;
  data?: Record<string, any>;
};
