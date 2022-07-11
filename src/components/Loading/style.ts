import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 60px;
  height: 50px;
  text-align: center;
  font-size: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
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
    background-color: rgba(144, 87, 242, 1);
  }
  .bar2 {
    background-color: rgba(90, 219, 219, 1);
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
  }
  .bar3 {
    background-color: #aef257;
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
  }
  .bar4 {
    background-color: #ebab46;
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }
  .bar5 {
    background-color: #1dd05e;
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
  }
  .bar6 {
    background-color: #eb341a;
    -webkit-animation-delay: -0.3s;
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
