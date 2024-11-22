import styled from 'styled-components';

export const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: ${({ theme }) => theme.colors.headerBackground || '#333'};
    color: ${({ theme }) => theme.colors.headerText || '#fff'};
`;
