import styled from 'styled-components';
import { blue, white, gray, black } from 'utils/colors';

export const ButtonStyle = styled.button`
  width: 196px;
  height: 32px;
  text-decoration: none;
  background-color: ${blue};
  border: none;
  border-radius: 8px;
  color: ${white};
  cursor: pointer;

  :disabled {
    background-color: ${gray};
    color: ${black};
    cursor: not-allowed;
  }
`;
