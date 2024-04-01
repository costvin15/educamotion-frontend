import { Backdrop, Dialog, DialogContent, LinearProgress, styled } from "@mui/material";

const BackdropForModal = styled(Backdrop)(({theme}) => ({
  zIndex: theme.zIndex.modal,
}));

export default function LoadingModal({percentage, open} : {percentage: number, open: boolean}) {
  return (
    <>
      <BackdropForModal open={open} />
      <Dialog open={open} fullWidth onClose={() => {}}>
        <DialogContent>
          <LinearProgress variant='determinate' value={percentage} />
        </DialogContent>
      </Dialog>
    </>
  );
}