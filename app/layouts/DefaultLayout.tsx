import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid } from '@mui/material';
import { styled } from '@mui/system';
import SideNav from '../componants/SideNav';

const DefaultLayout: React.FC = ({ children }: any) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Header
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        <Grid container>
          <Grid item xs={12} md={3}>
            <SideNav />
          </Grid>
          <Grid item xs={12} md={9}>
            {/* <Main> {children}</Main> */}
            {children}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DefaultLayout;

// const Main = styled('main')(({ theme }) => ({
//   flexGrow: 1,
//   [theme.breakpoints.up('md')]: {
//     marginLeft: '20rem',
//   },
// }));
