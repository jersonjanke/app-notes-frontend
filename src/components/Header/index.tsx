import { Container } from 'react-grid-system';
import Link from 'next/link';
import { Wrapper, Menu } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Settings from '../Settings';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreData } from 'types/Login';

const Header: React.FC = () => {
  const [show, setShow] = useState(false);
  const state = useSelector((state: StoreData) => state);
  return (
    <>
      <Wrapper>
        <Container style={{ width: '100%' }}>
          <Menu>
            <Link href={'/dashboard'}>Guitar Notes</Link>
            <div>
              {state?.user?.token && (
                <FontAwesomeIcon
                  onClick={() => setShow(true)}
                  icon={faCog as IconProp}
                  size="1x"
                  style={{ marginRight: 4, cursor: 'pointer' }}
                />
              )}

              {!state.user?.token && <Link href={'/'}>Entrar</Link>}
            </div>
          </Menu>
        </Container>
        {state.user.token && (
          <Settings open={show} onClose={() => setShow(false)} />
        )}
      </Wrapper>
    </>
  );
};

export default Header;
