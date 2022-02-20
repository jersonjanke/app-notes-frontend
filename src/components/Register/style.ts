import styled from 'styled-components';

export const WrapperForm = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  > input {
    margin-bottom: 12px;
  }
`;

export const Wrapper = styled.div`
  min-width: 472px;
`;
