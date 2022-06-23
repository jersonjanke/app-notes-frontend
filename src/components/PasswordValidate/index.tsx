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
import Image from 'next/image';

type Props = {
  password: string;
};

const PasswordValidate = ({ password }: Props) => {
  const checkIcon = '/svg/check.svg';
  const xIcon = '/svg/x.svg';
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
          <Image layout="fixed" src={checkIcon} alt="Check" />
        ) : (
          <Image layout="fixed" src={xIcon} alt="uncheck" />
        )}
        <span style={{ marginLeft: 6 }}>6 caracteres ou mais</span>
      </div>
      <div>
        {numberOk ? (
          <Image layout="fixed" src={checkIcon} alt="Check" />
        ) : (
          <Image layout="fixed" src={xIcon} alt="uncheck" />
        )}
        <span style={{ marginLeft: 6 }}>Um número</span>
      </div>
      <div>
        {upperCaseOk ? (
          <Image layout="fixed" src={checkIcon} alt="Check" />
        ) : (
          <Image layout="fixed" src={xIcon} alt="uncheck" />
        )}
        <span style={{ marginLeft: 6 }}>Uma letra maiúscula</span>
      </div>
      <div>
        {lowerCaseOk ? (
          <Image layout="fixed" src={checkIcon} alt="Check" />
        ) : (
          <Image layout="fixed" src={xIcon} alt="uncheck" />
        )}
        <span style={{ marginLeft: 6 }}>Uma letra maiúscula</span>
      </div>
      <div>
        {specialCharacterOk ? (
          <Image layout="fixed" src={checkIcon} alt="Check" />
        ) : (
          <Image layout="fixed" src={xIcon} alt="uncheck" />
        )}
        <span style={{ marginLeft: 6 }}>Um carácter especial (@$!?+%)</span>
      </div>
    </Wrapper>
  );
};

export default PasswordValidate;
