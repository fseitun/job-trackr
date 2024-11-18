import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    /* Reset CSS */
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    /* Global Styles */
    #root {
        max-width: 1280px;
        margin: 0 auto;
        padding: ${({ theme }) => theme.spacing.large};
        text-align: center;
        background-color: ${({ theme }) => theme.colors.black};
    }

    body {
        font-family: ${({ theme }) => theme.fontFamily || 'Inter, sans-serif'};
        line-height: 1.5;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.text || '#000'};
        background-color: ${({ theme }) => theme.colors.background || '#fff'};
        color-scheme: ${({ theme }) => theme.colorScheme || 'light dark'};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }

    a {
        font-weight: 500;
        color: ${({ theme }) => theme.colors.link || '#646cff'};
        text-decoration: none;

        &:hover {
            color: ${({ theme }) => theme.colors.linkHover || '#535bf2'};
        }
    }

    h1, h2, h3, h4, h5, h6 {
        color: ${({ theme }) => theme.colors.heading || '#000'};
    }

    button {
        border-radius: ${({ theme }) => theme.borderRadius.medium};
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: ${({ theme }) => theme.fontSize.medium};
        font-weight: 500;
        font-family: inherit;
        background-color: ${({ theme }) => theme.colors.primary};
        cursor: pointer;
        transition: border-color 0.25s, background-color 0.3s;

        &:hover {
            border-color: ${({ theme }) => theme.colors.hoverBorder || '#646cff'};
            background-color: ${({ theme }) => theme.colors.primaryHover || '#535bf2'};
        }

        &:focus,
        &:focus-visible {
            outline: 4px auto ${({ theme }) => theme.colors.focusOutline || '-webkit-focus-ring-color'};
        }
    }

`;
