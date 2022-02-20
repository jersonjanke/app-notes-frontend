import { Wrapper } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { blue } from 'utils/colors';
import { useMemo } from 'react';
import { IconX } from './style';
import {
  hasLowerCase,
  hasNumber,
  hasSpecialCharacter,
  hasUpperCase,
} from 'utils/validate';

type Props = {
  password: string;
};

const Password = ({ password }: Props) => {
  const numberOk = useMemo(() => hasNumber(password), [password]);
  const upperCaseOk = useMemo(() => hasUpperCase(password), [password]);
  const lowerCaseOk = useMemo(() => hasLowerCase(password), [password]);
  const specialCharacterOk = useMemo(
    () => hasSpecialCharacter(password),
    [password]
  );

  return (
    <Wrapper>
      <div>
        {password.length > 5 ? (
          <FontAwesomeIcon icon={faCheck} color={blue} size="1x" />
        ) : (
          <IconX>X</IconX>
        )}
        <span style={{ marginLeft: 6 }}>6 caracteres ou mais</span>
      </div>
      <div>
        {numberOk ? (
          <FontAwesomeIcon icon={faCheck} color={blue} size="1x" />
        ) : (
          <IconX>X</IconX>
        )}
        <span style={{ marginLeft: 6 }}>Um número</span>
      </div>
      <div>
        {upperCaseOk ? (
          <FontAwesomeIcon icon={faCheck} color={blue} size="1x" />
        ) : (
          <IconX>X</IconX>
        )}
        <span style={{ marginLeft: 6 }}>Uma letra maiúscula</span>
      </div>
      <div>
        {lowerCaseOk ? (
          <FontAwesomeIcon icon={faCheck} color={blue} size="1x" />
        ) : (
          <IconX>X</IconX>
        )}
        <span style={{ marginLeft: 6 }}>Uma letra maiúscula</span>
      </div>
      <div>
        {specialCharacterOk ? (
          <FontAwesomeIcon icon={faCheck} color={blue} size="1x" />
        ) : (
          <IconX>X</IconX>
        )}
        <span style={{ marginLeft: 6 }}>Um carácter especial (@$!?+%)</span>
      </div>
    </Wrapper>
  );
};

export default Password;
