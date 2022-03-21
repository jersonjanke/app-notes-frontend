import { ButtonStyle } from './style';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ButtonHTMLAttributes, ForwardRefRenderFunction } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type ButtonProps = {
  onClick?: () => void;
  children: any;
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
    <ButtonStyle {...props} onClick={onClick}>
      {children}
      {loading && (
        <FontAwesomeIcon
          style={{ marginLeft: 8 }}
          spin
          icon={faSpinner as IconProp}
        />
      )}
    </ButtonStyle>
  );
};

export default Button;
