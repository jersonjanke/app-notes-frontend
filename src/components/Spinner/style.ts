import styled from 'styled-components';
import { white } from 'utils/colors';

export const SpinnerWrapper = styled.div`
  width: 26px;
  height: 26px;
  position: relative;

  div {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid transparent;
    border-top-color: ${white};
    border-radius: 50%;
    animation: spinnerOne 1.4s linear infinite;
  }

  div:nth-child(2) {
    border: 4px solid transparent;
    border-bottom-color: ${white};
    animation: spinnerTwo 1.4s linear infinite;
  }

  @keyframes spinnerOne {
    0% {
      transform: rotate(0deg);
      border-width: 2px;
    }
    50% {
      transform: rotate(180deg);
      border-width: 2px;
    }
    100% {
      transform: rotate(360deg);
      border-width: 2px;
    }
  }

  @keyframes spinnerTwo {
    0% {
      transform: rotate(0deg);
      border-width: 2px;
    }
    50% {
      transform: rotate(180deg);
      border-width: 2px;
    }
    100% {
      transform: rotate(360deg);
      border-width: 2px;
    }
  }
`;
