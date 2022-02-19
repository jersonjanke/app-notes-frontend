import { InputHTMLAttributes } from 'react';
import { InputWrapper, Label } from './style';

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <>
      {props.title && <Label htmlFor={props?.id}>{props.title}</Label>}
      <InputWrapper {...props} />
    </>
  );
};

export default Input;
