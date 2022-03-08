import { Wrapper } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { blue } from 'utils/colors';
import { useEffect, useMemo } from 'react';
import { IconX } from './style';
import { useDispatch } from 'react-redux';
import { setValidPassword } from 'store/actions/user';
import {
  hasLowerCase,
  hasNumber,
  hasSpecialCharacter,
  hasUpperCase,
} from 'utils/validate';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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
  }, [numberOk, upperCaseOk, lowerCaseOk, specialCharacterOk]);

  return (
    <Wrapper>
      <div>
        {password.length > 5 ? (
          <FontAwesomeIcon icon={faCheck as IconProp} color={blue} size="1x" />
        ) : (
          <IconX>X</IconX>
        )}
        <span style={{ marginLeft: 6 }}>6 caracteres ou mais</span>
      </div>
      <div>
        {numberOk ? (
          <FontAwesomeIcon icon={faCheck as IconProp} color={blue} size="1x" />
        ) : (
          <IconX>X</IconX>
        )}
        <span style={{ marginLeft: 6 }}>Um número</span>
      </div>
      <div>
        {upperCaseOk ? (
          <FontAwesomeIcon icon={faCheck as IconProp} color={blue} size="1x" />
        ) : (
          <IconX>X</IconX>
        )}
        <span style={{ marginLeft: 6 }}>Uma letra maiúscula</span>
      </div>
      <div>
        {lowerCaseOk ? (
          <FontAwesomeIcon icon={faCheck as IconProp} color={blue} size="1x" />
        ) : (
          <IconX>X</IconX>
        )}
        <span style={{ marginLeft: 6 }}>Uma letra maiúscula</span>
      </div>
      <div>
        {specialCharacterOk ? (
          <FontAwesomeIcon icon={faCheck as IconProp} color={blue} size="1x" />
        ) : (
          <IconX>X</IconX>
        )}
        <span style={{ marginLeft: 6 }}>Um carácter especial (@$!?+%)</span>
      </div>
    </Wrapper>
  );
};

export default PasswordValidate;
