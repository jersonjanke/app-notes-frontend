import styled from 'styled-components';
import { primary, gray, purple } from 'utils/colors';

export const Table = styled.table`
  margin-top: 24px;
  margin-bottom: 48px;
  border-collapse: collapse;
  width: 100%;

  td,
  th {
    border: 1px solid ${purple};
    text-align: left;
    padding: 8px;
    text-align: start;
  }

  td:nth-child(2n + 1) {
    background-color: ${primary};
  }

  td:nth-child(2n + 2) {
    background-color: ${gray};
  }

  th:nth-child(2n + 1) {
    background-color: ${primary};
  }

  th:nth-child(2n + 2) {
    background-color: ${gray};
  }
`;
