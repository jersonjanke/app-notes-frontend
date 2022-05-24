import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-self: center;
  margin-top: 36px;
  margin-left: 92px;
  width: 78px;
  height: 50px;
  text-align: center;
  font-size: 10px;
  -webkit-transform: translateY(-50%) translateX(-50%);

  > div {
    height: 100%;
    width: 8px;
    display: inline-block;
    float: left;
    margin-left: 2px;
    -webkit-animation: delay 0.8s infinite ease-in-out;
    animation: delay 0.8s infinite ease-in-out;
  }

  .bar1 {
    background-color: #f1f1f1;
  }
  .bar2 {
    background-color: #f1f1f1;
    -webkit-animation-delay: -1.4s;
    animation-delay: -0.7s;
  }
  .bar3 {
    background-color: #f1f1f1;
    -webkit-animation-delay: -1.2s;
    animation-delay: -0.6s;
  }
  .bar4 {
    background-color: #f1f1f1;
    -webkit-animation-delay: -1s;
    animation-delay: -0.5s;
  }
  .bar5 {
    background-color: #f1f1f1;
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.4s;
  }
  .bar6 {
    background-color: #f1f1f1;
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.3s;
  }

  @-webkit-keyframes delay {
    0%,
    40%,
    100% {
      -webkit-transform: scaleY(0.05);
    }
    20% {
      -webkit-transform: scaleY(1);
    }
  }

  @keyframes delay {
    0%,
    40%,
    100% {
      transform: scaleY(0.05);
      -webkit-transform: scaleY(0.05);
    }
    20% {
      transform: scaleY(1);
      -webkit-transform: scaleY(1);
    }
  }
`;
