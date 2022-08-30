import styled from 'styled-components';
import { primary, white, gray, black } from 'utils/colors';

export const ButtonStyle = styled.button<{ color: 'primary' | 'black' }>`
  width: 124px;
  height: 32px;
  text-decoration: none;
  background-color: ${(props) => (props.color === 'primary' ? primary : black)};
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
