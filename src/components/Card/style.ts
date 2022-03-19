import styled from 'styled-components';
import { shadow } from 'utils/colors';

export const Wrapper = styled.div`
  min-width: 450px;
  box-shadow: ${shadow};
  padding: 20px;
  border-radius: 8px;

  @media screen and (max-width: 600px) {
    width: 90vw;
    min-width: 100%;
    box-shadow: none;
  }
`;
