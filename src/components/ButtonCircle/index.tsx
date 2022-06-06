import { ButtonStyle } from './style';
import React, { ButtonHTMLAttributes, ForwardRefRenderFunction } from 'react';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  props?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonCircle: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = ({ onClick, children, ...props }) => {
  return (
    <ButtonStyle data-testid="buttonCircle" {...props} onClick={onClick}>
      {children}
    </ButtonStyle>
  );
};

export default ButtonCircle;
