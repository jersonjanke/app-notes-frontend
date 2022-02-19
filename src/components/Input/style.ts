import styled from 'styled-components';
import { black, white } from 'utils/colors';

export const InputWrapper = styled.input`
  padding: 4px 8px;
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(191, 191, 191);
  background-color: ${white};
  color: ${black};
`;

export const Label = styled.label`
  color: ${black};
`;
