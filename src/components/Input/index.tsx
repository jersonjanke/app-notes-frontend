import { InputHTMLAttributes } from 'react';
import { InputWrapper } from './style';

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <>
      {props.title && <label htmlFor={props?.id}>{props.title}</label>}
      <InputWrapper {...props} />
    </>
  );
};

export default Input;
