import styled from 'styled-components';
import { blue, white, gray, black } from 'utils/colors';

export const ButtonStyle = styled.button`
  width: 96px;
  height: 96px;
  text-decoration: none;
  background-color: ${blue};
  border: none;
  border-radius: 50%;
  color: ${white};
  cursor: pointer;

  :disabled {
    background-color: ${gray};
    color: ${black};
    cursor: not-allowed;
  }
`;
