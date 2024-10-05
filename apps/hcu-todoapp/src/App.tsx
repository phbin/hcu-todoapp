import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import MainPage from './pages/MainPage';

const App = () => {
   const theme = createTheme({
      palette: {
         primary: {
            main: '#556cd6',
         },
      },
   });
   return (
      <>
         <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainPage />
         </ThemeProvider>
      </>
   );
};

export default App;
