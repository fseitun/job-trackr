import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Button } from '../styles/Common.styles';
import { darkTheme } from '../styles/theme';

export function ThemeToggle() {
    const { toggleTheme, theme } = useContext(ThemeContext);

    return (
        <Button onClick={toggleTheme}>
            Switch to {theme === darkTheme ? 'Light' : 'Dark'} Mode
        </Button>
    );
}
