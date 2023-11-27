import { Backdrop, Card, CardContent, Modal, Typography, styled } from '@mui/material';

const ModalCard = styled(Card)(() => ({
  width: 'calc(100vw - 50px)',
  height: 'calc(100vh - 50px)',
  margin: '25px',
  outline: 'none',
}));

const BackdropForModal = styled(Backdrop)(({theme}) => ({
  zIndex: theme.zIndex.modal,
}));

export default function NewDocumentModal({open, onClose}: {open: boolean, onClose: () => void}) {
  return (
    <>
      <BackdropForModal open={open} onClick={onClose} />
      <Modal open={open}
        onClose={onClose}>
        <ModalCard>
          <CardContent>
            <Typography variant='h5' component='div'>
              Criar novo documento
            </Typography>
          </CardContent>
        </ModalCard>
      </Modal>
    </>
  );
}
