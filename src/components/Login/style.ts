import styled from 'styled-components';
import { shadow } from 'utils/colors';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 432px;
  margin: 0 auto;
  gap: 4px;
  box-shadow: ${shadow};
  padding: 20px;
  border-radius: 8px;
  margin-top: 12px;

  @media screen and (max-width: 600px) {
    width: 100%;
    box-shadow: none;
  }
`;

export const WrapperText = styled.p`
  width: 432px;
  margin: 0 auto;
  margin-top: 14px;
  font-size: 14px;

  @media screen and (max-width: 600px) {
    width: 90vw;
  }
`;
