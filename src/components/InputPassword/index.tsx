import { InputHTMLAttributes, useState } from 'react';
import { InputWrapper, Label, Wrapper } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const InputPassword = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const [icon, setIcon] = useState(faEyeSlash);
  return (
    <Wrapper>
      {props.title && <Label htmlFor={props?.id}>{props.title}</Label>}
      <InputWrapper {...props} type={icon === faEye ? 'text' : 'password'} />
      <FontAwesomeIcon
        icon={icon}
        onClick={() => setIcon(icon === faEye ? faEyeSlash : faEye)}
      />
    </Wrapper>
  );
};

export default InputPassword;
