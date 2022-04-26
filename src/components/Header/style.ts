import styled from 'styled-components';
import { shadow, primary } from 'utils/colors';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 76px;
  box-shadow: ${shadow};
  margin-bottom: 24px;
  color: ${primary};
`;

export const Menu = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  a {
    font-size: 18px;
    cursor: pointer;
  }
`;
