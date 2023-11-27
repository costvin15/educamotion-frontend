'use client'
import {Backdrop, Button, CSSObject, IconButton, Drawer as MuiDrawer, Stack, Theme, Toolbar, Typography, styled} from '@mui/material';
import {
  Menu as MenuIcon,
  Add as AddIcon,
  Inbox as InboxIcon,
  Star as StarIcon,
  Email as EmailIcon,
  Drafts as DraftsIcon
} from '@mui/icons-material';
import { useState } from 'react';

import NewDocumentModal from '@/app/dashboard/modals/NewDocument';

const miniDrawerWidth = 80;
const drawerWidth = 300;
const backgroundColor = '#141218';

const openedMixin = (theme: Theme) : CSSObject => ({
  width: drawerWidth,
  boxSizing: 'border-box',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor,
  border: 'none',
  borderTopRightRadius: 16,
});

const closedMixin = (theme: Theme) : CSSObject => ({
  width: miniDrawerWidth,
  boxSizing: 'border-box',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  backgroundColor,
  border: 'none',
  borderTopRightRadius: 16,
});

const PermanentDrawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: miniDrawerWidth,
  flexShrink: 0,
  ...(open && {
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    '& .MuiDrawer-paper': closedMixin(theme),
  })
}));

const IconButtonCentered = styled(IconButton)(() => ({
  margin: '0',
  marginTop: '5px',
  marginBottom: '5px',
}));

const NewDocumentButton = styled(Button)(() => ({
  margin: 'auto',
  paddingTop: '22px',
  paddingBottom: '22px',
  borderRadius: '16px'
}));

const ShortcutsToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: miniDrawerWidth,
  marginRight: '10px'
}));

const ContainerStack = styled(Stack)(() => ({
  width: drawerWidth,
  alignItems: 'center',
  marginBottom: '5px',
}));

const BackdropForDrawer = styled(Backdrop)(({theme}) => ({
  zIndex: theme.zIndex.drawer,
}));

export default function Drawer() : JSX.Element {
  const [open, setOpen] = useState(false);

  const handleDrawerOpened = () => {
    setOpen(!open);
  };

  return (  
    <>
      <NewDocumentModal open={false} onClose={() => {}} />
      <BackdropForDrawer open={open}
        onClick={handleDrawerOpened} />
      <PermanentDrawer
        open={open}
        variant='permanent'
        anchor='left'>
        <ContainerStack direction="row" overflow="hidden">
          <ShortcutsToolbar disableGutters>
            <IconButtonCentered onClick={handleDrawerOpened}>
              <MenuIcon />
            </IconButtonCentered>
          </ShortcutsToolbar>
        </ContainerStack>

        <ContainerStack direction="row" overflow="hidden">
          <ShortcutsToolbar disableGutters>
            <NewDocumentButton variant='contained'>
              <AddIcon />
            </NewDocumentButton>
          </ShortcutsToolbar>

          <Typography>Nova apresentação</Typography>
        </ContainerStack>

        <ContainerStack direction="row" overflow="hidden">
          <ShortcutsToolbar disableGutters>
            <IconButtonCentered>
              <InboxIcon />
            </IconButtonCentered>
          </ShortcutsToolbar>

          <Typography>Nova apresentação</Typography>
        </ContainerStack>

        <ContainerStack direction="row" overflow="hidden">
          <ShortcutsToolbar disableGutters>
            <IconButtonCentered>
              <StarIcon />
            </IconButtonCentered>
          </ShortcutsToolbar>

          <Typography>Nova apresentação</Typography>
        </ContainerStack>

        <ContainerStack direction="row" overflow="hidden">
          <ShortcutsToolbar disableGutters>
            <IconButtonCentered>
              <EmailIcon />
            </IconButtonCentered>
          </ShortcutsToolbar>

          <Typography>Nova apresentação</Typography>
        </ContainerStack>

        <ContainerStack direction="row" overflow="hidden">
          <ShortcutsToolbar disableGutters>
            <IconButtonCentered>
              <DraftsIcon />
            </IconButtonCentered>
          </ShortcutsToolbar>

          <Typography>Nova apresentação</Typography>
        </ContainerStack>
      </PermanentDrawer>
    </>
  );
}
