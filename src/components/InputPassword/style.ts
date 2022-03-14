import styled from 'styled-components';
import { black, white } from 'utils/colors';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const WrapperIcon = styled.div`
  display: flex;
  justify-content: flex-end;

  > svg {
    cursor: pointer;
    position: absolute;
    margin-top: 8px;
    margin-right: 8px;
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
