import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import { StyledEngineProvider } from '@mui/material/styles';
import App from './AppErzhena';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root1') as HTMLElement).render(
  <React.StrictMode>
    {/* <StyledEngineProvider injectFirst> */}
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>

    {/* </StyledEngineProvider> */}
  </React.StrictMode>,
);