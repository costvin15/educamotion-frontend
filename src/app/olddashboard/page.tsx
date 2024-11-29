import { Grid } from "@mui/material";

import DocumentsBar from '@/app/olddashboard/components/DocumentsBar';
import DocumentsGrid from '@/app/olddashboard/components/DocumentsGrid';

export default function dashboard() {
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
