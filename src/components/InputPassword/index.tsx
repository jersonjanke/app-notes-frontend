import { InputHTMLAttributes, useState } from 'react';
import { InputWrapper, Label, Wrapper, WrapperIcon } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const InputPassword = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const [icon, setIcon] = useState(faEyeSlash);
  return (
    <Wrapper>
      {props?.title && <Label htmlFor={props?.id}>{props?.title}</Label>}
      <WrapperIcon>
        <InputWrapper {...props} type={icon === faEye ? 'text' : 'password'} />
        <FontAwesomeIcon
          icon={icon as IconProp}
          onClick={() => setIcon(icon === faEye ? faEyeSlash : faEye)}
        />
      </WrapperIcon>
    </Wrapper>
  );
};

export default InputPassword;
