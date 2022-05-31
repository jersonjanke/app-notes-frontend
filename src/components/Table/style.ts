import styled from 'styled-components';
import { gray } from 'utils/colors';

export const Wrapper = styled.table`
  th {
    font-size: 14px;

    @media screen and (max-width: 600px) {
      font-size: 12px;
    }
  }

  th,
  td {
    border: 1px solid ${gray};
    text-align: left;
    padding: 8px;
  }
`;
