import { ButtonStyle } from './style';
import React, { ButtonHTMLAttributes, ForwardRefRenderFunction } from 'react';
import Spinner from '../Spinner';
import Flex from '../Flex';

type ButtonProps = {
  children: React.ReactNode;
  color: 'primary' | 'black';
  onClick?: () => void;
  loading?: boolean;
  props?: any;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = ({
  onClick,
  color = 'primary',
  children,
  loading,
  ...props
}) => {
  return (
    <ButtonStyle
      color={color}
      data-testid="button"
      {...props}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <Flex justifyContent="center">
          <Spinner />
        </Flex>
      ) : (
        children
      )}
    </ButtonStyle>
  );
};

export default Button;
