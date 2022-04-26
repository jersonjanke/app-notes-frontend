import styled from 'styled-components';
import { primary, white, gray, black } from 'utils/colors';

export const ButtonStyle = styled.button`
  width: 64px;
  height: 64px;
  text-decoration: none;
  background-color: ${primary};
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
