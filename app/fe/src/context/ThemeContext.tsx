import { createContext, useState, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '@/styles/theme';

interface ThemeContextType {
    toggleTheme: () => void;
    theme: typeof darkTheme | typeof lightTheme;
}

export const ThemeContext = createContext<ThemeContextType>({
    toggleTheme: () => {},
    theme: darkTheme,
});

export function ThemeContextProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<typeof darkTheme | typeof lightTheme>(
        darkTheme,
    );

    function toggleTheme() {
        setTheme((prevTheme) =>
            prevTheme === darkTheme ? lightTheme : darkTheme,
        );
    }

    return (
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
            <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
        </ThemeContext.Provider>
    );
}
