import styled from 'styled-components';
import { primary, white } from 'utils/colors';

export const Wrapper = styled.div`
  z-index: -1;

  .custom-shape-divider-bottom {
    margin-top: 32px;
  }

  .custom-shape-divider-bottom svg {
    position: relative;
    display: block;
    width: 100%;
    height: 142px;

    @media (max-width: 768px) {
      height: 86px;
    }
  }

  .custom-shape-divider-bottom .shape-fill {
    fill: ${primary};
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  height: 64px;
  width: 100%;
  color: ${white};
  text-align: center;
  background-color: ${primary};
`;
