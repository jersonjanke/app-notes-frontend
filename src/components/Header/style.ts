import styled from 'styled-components';
import { shadow, primary, white } from 'utils/colors';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 76px;
  box-shadow: ${shadow};
  color: ${primary};
  margin-bottom: 24px;
  background-color: ${primary};
`;

export const Menu = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  a {
    color: ${white};
    font-size: 18px;
    cursor: pointer;
  }
`;
