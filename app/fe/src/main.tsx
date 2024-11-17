import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import GlobalStyle from './styles/GlobalStyle';
import { AuthProvider } from './context/AuthProvider';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>,
);
