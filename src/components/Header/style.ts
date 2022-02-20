import styled from 'styled-components';
import { white, blue } from 'utils/colors';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 76px;
  background-color: ${blue};
  color: ${white};
  margin-bottom: 24px;
`;

export const Menu = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ItemMenu = styled.div`
  cursor: pointer;
`;
