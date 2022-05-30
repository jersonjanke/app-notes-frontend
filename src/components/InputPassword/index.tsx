import { InputHTMLAttributes, useState } from 'react';
import { InputWrapper, Label, Wrapper, WrapperIcon } from './style';
import Image from 'next/image';
import eye from '../../../public/icons/eye.svg';
import eyeOff from '../../../public/icons/eye-off.svg';

const InputPassword = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const [icon, setIcon] = useState(eye);
  return (
    <Wrapper>
      {props?.title && <Label htmlFor={props?.id}>{props?.title}</Label>}
      <WrapperIcon>
        <InputWrapper {...props} type={icon === eye ? 'text' : 'password'} />
        <Image
          src={icon}
          onClick={() => setIcon(icon === eye ? eyeOff : eye)}
        />
      </WrapperIcon>
    </Wrapper>
  );
};

export default InputPassword;
