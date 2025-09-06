import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

export default function SimpleContainer() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="false" disableGutters={true}>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} >
          <Outlet />
          </Box>
      </Container>
    </>
  );
}