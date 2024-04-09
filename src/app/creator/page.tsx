import { Grid } from "@mui/material";

import DocumentsBar from '@/app/creator/components/DocumentsBar';
import DocumentsGrid from '@/app/creator/components/DocumentsGrid';

export default function Creator() {
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
