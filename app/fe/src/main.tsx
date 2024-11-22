import { App } from './App';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { ThemeContextProvider } from './context/ThemeContext.tsx';
import { AuthProvider } from './context/AuthProvider';
import { GlobalStyle } from './styles/GlobalStyle';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ThemeContextProvider>
                    <GlobalStyle />
                    <App />
                </ThemeContextProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
);
