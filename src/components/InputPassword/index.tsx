import { InputHTMLAttributes, useState } from 'react';
import { InputWrapper, Label, Wrapper, WrapperIcon } from './style';
import Image from 'next/image';

const InputPassword = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const eye = '/svg/eye.svg';
  const eyeOff = '/svg/eye-off.svg';
  const [icon, setIcon] = useState(eye);
  return (
    <Wrapper data-testid="inputPassword">
      {props?.title && <Label htmlFor={props?.id}>{props?.title}</Label>}
      <WrapperIcon>
        <InputWrapper {...props} type={icon == eye ? 'password' : 'text'} />
        <Image
          height="24px"
          width="24px"
          layout="fixed"
          alt="fixed"
          src={icon ? icon : eye}
          onClick={() => setIcon(icon === eye ? eyeOff : eye)}
        />
      </WrapperIcon>
    </Wrapper>
  );
};

export default InputPassword;
