'use client'
import {Avatar, Backdrop, Button, CSSObject, IconButton, Drawer as MuiDrawer, Stack, Theme, Toolbar, Typography, styled} from '@mui/material';
import {
  Menu as MenuIcon,
  Sync as SyncIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { useState } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import ImportPresentationModal from '@/app/creator/modals/ImportPresentation';

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
  const { data : session } = useSession({ required: true });
  const router = useRouter();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [importPresentationsModalOpen, setImportPresentationsModalOpen] = useState(false);

  const handleDrawerOpened = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleImportPresentationsModalOpened = () => {
    setImportPresentationsModalOpen(!importPresentationsModalOpen);
  }

  const redirectToDashboard = () => {
    router.push('/creator');
  }

  return (  
    <>
      <ImportPresentationModal open={importPresentationsModalOpen} onClose={handleImportPresentationsModalOpened} />
      <BackdropForDrawer open={drawerOpen}
        onClick={handleDrawerOpened} />
      <PermanentDrawer
        open={drawerOpen}
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
            <NewDocumentButton variant='contained' onClick={handleImportPresentationsModalOpened}>
              <SyncIcon />
            </NewDocumentButton>
          </ShortcutsToolbar>

          <Typography>Nova apresentação</Typography>
        </ContainerStack>

        <ContainerStack direction="row" overflow="hidden">
          <ShortcutsToolbar disableGutters>
            <IconButtonCentered onClick={redirectToDashboard}>
              <HomeIcon />
            </IconButtonCentered>
          </ShortcutsToolbar>

          <Typography>Dashboard</Typography>
        </ContainerStack>

        <ContainerStack direction="row" overflow="hidden">
          <ShortcutsToolbar disableGutters>
            <IconButtonCentered>
              <Avatar src={session?.user?.image ?? ''} />
            </IconButtonCentered>
          </ShortcutsToolbar>

          <Typography>{session?.user?.name}</Typography>
        </ContainerStack>
      </PermanentDrawer>
    </>
  );
}
