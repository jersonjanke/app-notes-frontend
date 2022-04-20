import styled from 'styled-components';
import { shadow, blue } from 'utils/colors';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 76px;
  box-shadow: ${shadow};
  margin-bottom: 24px;
  color: ${blue};
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
