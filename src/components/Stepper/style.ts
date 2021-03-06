import styled, { css } from 'styled-components';
import { gray, black, white, primary, shadow } from 'utils/colors';

type ItemProps = {
  current: boolean;
};

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const Item = styled.div<ItemProps>`
  padding: 12px;
  background-color: ${gray};
  color: ${black};
  border-radius: 50%;
  height: 36px;
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${shadow};
  cursor: pointer;

  ${(props) =>
    props.current &&
    css`
      background-color: ${primary};
      color: ${white};
      font-weight: bold;
      transition: 500ms;
    `}
`;
