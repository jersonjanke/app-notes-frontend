import { ButtonStyle } from './style';
import React, { ButtonHTMLAttributes, ForwardRefRenderFunction } from 'react';
import Spinner from '../Spinner';
import Flex from '../Flex';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  loading?: boolean;
  props?: any;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = ({
  onClick,
  children,
  loading,
  ...props
}) => {
  return (
    <ButtonStyle
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
