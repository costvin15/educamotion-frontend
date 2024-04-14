import { Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from "@mui/material";

import client from '@/client';

const BackdropForModal = styled(Backdrop)(({theme}) => ({
  zIndex: theme.zIndex.modal,
}));

async function createSession(presentationId: string) {
  const { data } = await client.post(`/session/create`, {
    presentationId,
  });
  return data;
}

export default function CreateSessionModal({ presentationId, open, onClose } : { presentationId: string, open: boolean, onClose: () => void }) {
  const handleCreateSession = async () => {
    const session = await createSession(presentationId);
    console.log(session);
  }

  return (
    <>
      <BackdropForModal open={open} onClick={onClose} />
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Deseja apresentar?</DialogTitle>
        <DialogContent>
          <DialogContentText>Ao prosseguir, será criado um código de acesso que possibilitará que outras pessoas acessem. Desejar iniciar uma sessão de apresentação?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className='normal-case' onClick={onClose}>
            Cancelar
          </Button>
          <Button className='normal-case' onClick={handleCreateSession}>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
