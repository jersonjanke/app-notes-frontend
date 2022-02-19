import { ButtonStyle } from './style';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ButtonHTMLAttributes, ForwardRefRenderFunction } from 'react';

type ButtonProps = {
  onClick?: () => void;
  label?: string;
  loading?: boolean;
  props?: any;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = ({
  onClick,
  label,
  loading,
  ...props
}) => {
  return (
    <ButtonStyle {...props} onClick={onClick}>
      {label}
      {loading && (
        <FontAwesomeIcon style={{ marginLeft: 8 }} spin icon={faSpinner} />
      )}
    </ButtonStyle>
  );
};

export default Button;
