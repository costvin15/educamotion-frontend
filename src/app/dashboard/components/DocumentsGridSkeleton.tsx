import { Box, Card, CardActionArea, CardHeader, Grid, Skeleton } from "@mui/material";

import { motion } from 'framer-motion';

export default function DocumentsGridSkeleton() {
  return (
    <Box component='main' className='pt-0 p-3'>
      <motion.div
        initial={{ x: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Grid container>
          {[...Array(9)].map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} p={1}>
              <Card>
                <CardActionArea>
                  <CardHeader
                    avatar={<Skeleton variant='circular' width={40} height={40} />}
                    title={<Skeleton variant='text' width='80%' />}
                    subheader={<Skeleton variant='text' width='40%' />} />
                  <Skeleton variant='rounded' height={194} />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
}
