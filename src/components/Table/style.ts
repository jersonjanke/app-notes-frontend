import styled from 'styled-components';
import { gray } from 'utils/colors';

export const Wrapper = styled.table`
  th,
  td {
    border: 1px solid ${gray};
    text-align: left;
    padding: 8px;
  }
`;
