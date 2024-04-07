import { useEffect, useState } from 'react';
import { Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, styled } from '@mui/material';

import RemoveIcon from '@mui/icons-material/Remove';

const BackdropForModal = styled(Backdrop)(({theme}) => ({
  zIndex: theme.zIndex.modal,
}));

type Presentation = {
  presentationId: string;
};

export default function NewPoll({presentation, open, onClose} : {presentation: Presentation, open: boolean, onClose: () => void}) {
  const [currentLastOptionId, setCurrentLastOptionId] = useState(1);
  const [options, setOptions] = useState([
    {
      id: 1,
      value: ''
    }
  ]);

  useEffect(() => {
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
          <FormControl className='mt-3' variant='outlined' fullWidth>
            <InputLabel>Título da enquete</InputLabel>
            <OutlinedInput
              type='text'
              label='Título da enquete'
              fullWidth />
          </FormControl>
          <DialogContentText className='pt-3'>
            Quais serão as opções da enquete?
          </DialogContentText>
          {options.map((option, index) => (
            <FormControl key={index} className='mt-3' variant='outlined' fullWidth>
              <InputLabel>Opção {index + 1}</InputLabel>
              <OutlinedInput
                fullWidth
                type='text'
                label='Opção 1'
                value={option.value}
                onChange={(e) => {
                  const newOptions = options.map((o) => {
                    if (o.id === option.id) {
                      return {...o, value: e.target.value};
                    }
                    return o;
                  });

                  if (option.id === currentLastOptionId) {
                    setOptions([...newOptions, {id: currentLastOptionId + 1, value: ''}]);
                    setCurrentLastOptionId(currentLastOptionId + 1);
                  } else {
                    setOptions(newOptions);
                  }
                }}
                endAdornment={
                  option.id !== currentLastOptionId && <>
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={() => {
                          setOptions(options.filter((o) => o.id !== option.id));
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </InputAdornment>
                  </>
                } />
            </FormControl>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={onClose}>Criar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
