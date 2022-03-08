import styled from 'styled-components';
import { red } from 'utils/colors';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    font-size: 14px;
    font-weight: 400;
  }
`;

export const IconX = styled.span`
  margin-left: 6px;
  font-weight: 'bold';
  color: ${red};
  font-size: 16px;
`;
