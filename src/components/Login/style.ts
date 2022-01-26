import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 33vw;
  margin: 0 auto;
  margin-top: 10vh;

  label {
    margin-top: 12px;
  }

  input {
    margin-top: 6px;
  }

  a {
    margin-top: 12px;
    font-size: 12px;
    color: blue;
    cursor: pointer;
  }

  button {
    width: 232px;
    margin-top: 12px;
    border-radius: 8px;
    border: none;
    height: 32px;
    cursor: pointer;
  }
`
