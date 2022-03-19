import styled from 'styled-components';
import { blue, white, shadow } from 'utils/colors';

export const Wrapper = styled.div`
  width: 100%;
  box-shadow: ${shadow};
  padding: 20px;
  border-radius: 8px;

  :hover {
    background: ${blue};
    color: ${white};
  }
`;
