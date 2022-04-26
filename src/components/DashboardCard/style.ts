import styled from 'styled-components';
import { primary, white, shadow } from 'utils/colors';

export const Wrapper = styled.div`
  width: 100%;
  box-shadow: ${shadow};
  padding: 20px;
  border-radius: 8px;
  color: ${primary};
  font-weight: 600;

  :hover {
    background: ${primary};
    color: ${white};
  }
`;
