import styled from 'styled-components';

export const WrapperForm = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  margin-bottom: 12px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  > input {
    margin-bottom: 12px;
  }
`;

export const Wrapper = styled.div`
  max-width: 472px;

  @media screen and (max-width: 600px) {
    width: 90vw;
  }
`;
