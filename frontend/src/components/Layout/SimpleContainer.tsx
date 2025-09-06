import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';

export default function SimpleContainer() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} disableGutters={true}>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} >
          <Header/>
          <Outlet />
          </Box>
      </Container>
    </>
  );
}