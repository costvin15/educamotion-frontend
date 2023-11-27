import { Grid } from "@mui/material";
import DocumentsBar from './components/DocumentsBar';
import DocumentsGrid from './components/DocumentsGrid';

export default function Home() {
  return (
    <Grid container>
      <Grid item md={3}>
        <DocumentsBar />
      </Grid>
      <Grid item md={9}>
        <DocumentsGrid />
      </Grid>
    </Grid>
  );
}
