import styled from 'styled-components';

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const Row = styled.tr`
    border-bottom: 1px solid #dddddd;
`;

export const Button = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    background-color: #1a73e8;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #1669c1;
    }
`;

export const EditButton = styled(Button)`
    background-color: #4caf50;

    &:hover {
        background-color: #3e8e41;
    }
`;
