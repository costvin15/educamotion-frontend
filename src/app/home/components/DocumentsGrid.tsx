import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { Avatar, Box, Card, CardHeader, CardMedia, Grid, IconButton, Typography, styled } from '@mui/material';
import { red } from '@mui/material/colors';

const ContainerBox = styled(Box)(() => ({
  flexGrow: 1,
  paddingTop: 0,
  padding: '24px',
}));

export default function DocumentsGrid() {
  return (
    <Grid container direction='column'>
      <ContainerBox component='main'>
        <Grid item>
          <Grid container>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
              <Grid key={index} item md={4} p={1}>
                <Card>
                  <CardHeader 
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }}>
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label='settings'>
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016" />
                </Card>
                <CardMedia
                  component="img"
                  height={194}
                  image="https://mui.com/static/images/cards/paella.jpg"
                  alt='Paella dish' />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </ContainerBox>
    </Grid>
  );
}