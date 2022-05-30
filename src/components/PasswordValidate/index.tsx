import {
  hasLowerCase,
  hasNumber,
  hasSpecialCharacter,
  hasUpperCase,
} from 'utils/validate';
import { Wrapper } from './style';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setValidPassword } from 'store/actions/user';
import checkIcon from '../../../public/icons/check.svg';
import xIcon from '../../../public/icons/x.svg';
import Image from 'next/image';

type Props = {
  password: string;
};

const PasswordValidate = ({ password }: Props) => {
  const dispatch = useDispatch();
  const numberOk = useMemo(() => hasNumber(password), [password]);
  const upperCaseOk = useMemo(() => hasUpperCase(password), [password]);
  const lowerCaseOk = useMemo(() => hasLowerCase(password), [password]);
  const specialCharacterOk = useMemo(
    () => hasSpecialCharacter(password),
    [password]
  );

  useEffect(() => {
    if (numberOk && upperCaseOk && lowerCaseOk && specialCharacterOk) {
      dispatch(setValidPassword(true));
    } else {
      dispatch(setValidPassword(false));
    }
  }, [numberOk, upperCaseOk, lowerCaseOk, specialCharacterOk, dispatch]);

  return (
    <Wrapper>
      <div>
        {password.length > 5 ? (
          <Image src={checkIcon} alt="Check" />
        ) : (
          <Image src={xIcon} alt="uncheck" />
        )}
        <span style={{ marginLeft: 6 }}>6 caracteres ou mais</span>
      </div>
      <div>
        {numberOk ? (
          <Image src={checkIcon} alt="Check" />
        ) : (
          <Image src={xIcon} alt="uncheck" />
        )}
        <span style={{ marginLeft: 6 }}>Um número</span>
      </div>
      <div>
        {upperCaseOk ? (
          <Image src={checkIcon} alt="Check" />
        ) : (
          <Image src={xIcon} alt="uncheck" />
        )}
        <span style={{ marginLeft: 6 }}>Uma letra maiúscula</span>
      </div>
      <div>
        {lowerCaseOk ? (
          <Image src={checkIcon} alt="Check" />
        ) : (
          <Image src={xIcon} alt="uncheck" />
        )}
        <span style={{ marginLeft: 6 }}>Uma letra maiúscula</span>
      </div>
      <div>
        {specialCharacterOk ? (
          <Image src={checkIcon} alt="Check" />
        ) : (
          <Image src={xIcon} alt="uncheck" />
        )}
        <span style={{ marginLeft: 6 }}>Um carácter especial (@$!?+%)</span>
      </div>
    </Wrapper>
  );
};

export default PasswordValidate;
