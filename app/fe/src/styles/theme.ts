export const colors = {
    red: '#f44336',
    primary: '#1a73e8',
    primaryHover: '#535bf2',
    danger: '#d93025',
    success: '#4caf50',
    warning: '#ff9800',
    white: '#ffffff',
    gray: '#555555',
    lightGray: '#cccccc',
    darkGray: '#333333',
    black: '#000000',
    disabled: '#f4a3a3',
    text: '#000000',
    background: '#ffffff',
    link: '#646cff',
    linkHover: '#535bf2',
    heading: '#000000',
    hoverBorder: '#646cff',
    focusOutline: '-webkit-focus-ring-color',
};

export const spacing = {
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
};

export const borderRadius = {
    small: '1px',
    medium: '5px',
};

export const fontSize = {
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
};

export const fontFamily = {
    primary: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
};

export const darkTheme = {
    colors: {
        ...colors,
        background: '#000000',
        text: '#ffffff',
    },
    spacing,
    borderRadius,
    fontSize,
    fontFamily,
    colorScheme: 'dark',
};

export const lightTheme = {
    colors: {
        ...colors,
        background: '#ffffff',
        text: '#000000',
    },
    spacing,
    borderRadius,
    fontSize,
    fontFamily,
    colorScheme: 'light',
};
