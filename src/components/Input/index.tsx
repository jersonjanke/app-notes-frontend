import { InputHTMLAttributes } from 'react';
import { InputWrapper, Label, Wrapper } from './style';

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Wrapper data-testid="input">
      {props.title && <Label htmlFor={props?.id}>{props.title}</Label>}
      <InputWrapper {...props} />
    </Wrapper>
  );
};

export default Input;
