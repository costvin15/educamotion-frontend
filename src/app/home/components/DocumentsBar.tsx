import { Circle as CircleIcon } from '@mui/icons-material';
import { Box, Button, Grid, Stack, Toolbar, Typography, styled } from '@mui/material';

const backgroundColorWhenSelected = '#4A4458';
const backgroundColorWhenUnselected = 'none';

const RoundedButton = styled(Button)(({variant}) => ({
  color: 'white',
  paddingTop: 10,
  paddingLeft: 24,
  paddingBottom: 10,
  borderRadius: 100,
  textTransform: 'none',
  justifyContent: 'left',
  marginBottom: '5px',
  backgroundColor: (variant == 'contained' ? backgroundColorWhenSelected : backgroundColorWhenUnselected)
}));

const SectionTitle = styled(Typography)(() => ({
  flexGrow: 1,
  paddingTop: '20px',
  paddingBottom: '20px'
}));

const DotIcon = styled(CircleIcon)(() => ({
  width: '12px',
  height: '12px'
}));

const ContainerBox = styled(Box)(() => ({
  flexGrow: 1,
  padding: '24px',
  paddingTop: 0,
}));

export default function DocumentsBar() {
  return (
    <Grid container direction='column'>
      <Grid item>
        <Toolbar>
          <Typography variant='h5'>
            Início
          </Typography>
        </Toolbar>
      </Grid>

      <Grid item>
        <ContainerBox component='main'>
          <Grid container>
            <Grid item md={12}>
              <SectionTitle variant='body2'>Apresentações</SectionTitle>
              <Stack>
                <RoundedButton variant='contained'
                  startIcon={<DotIcon />}>
                  <Typography>Apresentação 1</Typography>
                </RoundedButton>

                <RoundedButton startIcon={<DotIcon />}>
                  <Typography>Apresentação 2</Typography>
                </RoundedButton>
                
                <RoundedButton startIcon={<DotIcon />}>
                  <Typography>Apresentação 3</Typography>
                </RoundedButton>
              </Stack>
            </Grid>
          </Grid>
        </ContainerBox>
      </Grid>
    </Grid>
  );
}
