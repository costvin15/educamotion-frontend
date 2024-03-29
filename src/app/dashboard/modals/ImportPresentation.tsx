import React, { useEffect, useState } from 'react';
import { Autocomplete, Backdrop, Box, Button, Card, CardContent, Chip, CircularProgress, Modal, TextField, Typography, styled } from '@mui/material';

import client from '@/client';

const BackdropForModal = styled(Backdrop)(({theme}) => ({
  zIndex: theme.zIndex.modal,
}));

const CenteredModal = styled(Modal)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Container = styled(Card)(() => ({
  width: 'calc(100vw - 60vw)',
}));

const ContainerButtons = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'right',
}));

const CircularButton = styled(Button)(() => ({
  borderRadius: '25px',
  marginTop: '15px',
  textTransform: 'none',
}));

type Presentation = {
  id: string;
  name: string;
}

type Presentations = {
  nextPageToken: string;
  files: Presentation[];
}

async function getPresentationsAvailable() : Promise<Presentations> {
  const {data} = await client.get('/presentation');
  return data;
}

export default function ImportPresentationModal({open, onClose}: {open: boolean, onClose: () => void}) {
  const [nextPageToken, setNextPageToken] = useState('' as string);
  const [presentations, setPresentations] = useState([] as Presentation[]);
  const [textFieldOpen, setTextFieldOpen] = useState(false);
  const [selectedPresentations, setSelectedPresentations] = useState<Presentation[]>();
  const loading = textFieldOpen && presentations.length === 0;

  const fetchPage = async () => {
    const {files, nextPageToken} = await getPresentationsAvailable();
    setPresentations([...files]);
    setNextPageToken(nextPageToken);
    setTextFieldOpen(true);
  }

  return (
    <>
      <BackdropForModal open={open} onClick={onClose} />
      <CenteredModal open={open} onClose={onClose}>
        <Container>
          <CardContent>
            <Autocomplete
              id='import-presentation-autocomplete'
              multiple
              options={presentations}
              value={selectedPresentations || []}
              open={textFieldOpen}
              onOpen={() => fetchPage()}
              onClose={() => setTextFieldOpen(false)}
              loading={loading}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id && option.name === value.name}
              onChange={(_, newValue) => setSelectedPresentations(newValue)}
              renderTags={(tagValue, getTagProps) => {
                return tagValue.map((option, index) => (
                  <Chip {...getTagProps({ index })} key={option.id} label={option.name} />
                ));
              }}
              renderInput={(props) => (
                <TextField
                  {...props}
                  key={props.id}
                  variant="standard"
                  label="Escolha as apresentações a serem importadas"
                />
              )}
              renderOption={(props, value) => (
                <li {...props} key={value.id}>
                  {value.name}
                </li>
              )} />

            <ContainerButtons>
              <CircularButton variant='contained'>Importar</CircularButton>
            </ContainerButtons>
          </CardContent>
        </Container>
      </CenteredModal>
    </>
  );
}
