import { Avatar, Backdrop, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, styled } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { blue } from "@mui/material/colors";

const BackdropForModal = styled(Backdrop)(({theme}) => ({
  zIndex: theme.zIndex.modal,
}));

export default function AddActivity({open, onClose} : {open: boolean, onClose: () => void}) {
  return (
    <>
      <BackdropForModal open={open} onClick={onClose} />
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Nova atividade</DialogTitle>
        <List sx={{ pt: 0 }}>
          {Array.from({length: 5}, (_, i) => (
            <ListItem disableGutters key={i}>
              <ListItemButton onClick={() => {}}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={'Hello world'} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
}
