import { useState } from 'react';
import { Avatar, Backdrop, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, styled } from '@mui/material';
import PollIcon from '@mui/icons-material/Poll';
import { blue } from '@mui/material/colors';

import NewPollModal from '@/app/editor/[id]/modals/NewPoll';

const BackdropForModal = styled(Backdrop)(({theme}) => ({
  zIndex: theme.zIndex.modal,
}));

type Presentation = {
  presentationId: string;
};

export default function AddActivity({presentation, open, onClose} : {presentation: Presentation, open: boolean, onClose: () => void}) {
  const [newPollModalOpen, setNewPollModalOpen] = useState(false);

  const activities = [
    {
      name: 'Enquete',
      icon: PollIcon,
      onAdd: () => {
        setNewPollModalOpen(true);
      },
    }
  ];

  return (
    <>
      <BackdropForModal open={open} onClick={onClose} />
      <NewPollModal presentation={presentation} open={newPollModalOpen} onClose={() => {
        onClose();
        setNewPollModalOpen(false);
      }} />
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Nova atividade</DialogTitle>
        <List sx={{ pt: 0 }}>
          {activities.map((activity, i) => (
            <ListItem disableGutters key={i}>
              <ListItemButton onClick={activity.onAdd}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <activity.icon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={activity.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
}
