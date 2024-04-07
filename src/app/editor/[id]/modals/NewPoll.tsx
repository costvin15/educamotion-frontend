import { Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, styled } from '@mui/material';
import { useEffect } from 'react';

const BackdropForModal = styled(Backdrop)(({theme}) => ({
  zIndex: theme.zIndex.modal,
}));

type Presentation = {
  presentationId: string;
};

export default function NewPoll({presentation, open, onClose} : {presentation: Presentation, open: boolean, onClose: () => void}) {
  useEffect(() => {
    console.log(presentation);
  }, []);

  return (
    <>
      <BackdropForModal open={open} onClick={onClose} />
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Nova enquete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Qual será o título da enquete?
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin='dense'
            label='Título da enquete'
            fullWidth
            variant='standard' />
          <DialogContentText className='pt-3'>
            Quais serão as opções da enquete?
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin='dense'
            label='Opção 1'
            fullWidth
            variant='standard' />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={onClose}>Criar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
