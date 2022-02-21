import styled from 'styled-components';
import { black, white } from 'utils/colors';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  > svg {
    cursor: pointer;
    position: absolute;
    right: 50px;
    margin-top: 34px;
  }
`;

export const InputWrapper = styled.input`
  width: 100%;
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
