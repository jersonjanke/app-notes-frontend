import styled from 'styled-components';
import { white, gradient } from 'utils/colors';
import Link from 'next/link';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 76px;
  background: ${gradient};
  color: ${white};
  margin-bottom: 24px;
`;

export const Menu = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ItemMenu = styled(Link)`
  cursor: pointer;
  font-size: 18px;
`;
