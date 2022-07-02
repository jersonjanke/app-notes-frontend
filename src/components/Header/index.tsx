import Link from 'next/link';
import Image from 'next/image';
import Settings from '../../forms/Settings';
import { Wrapper, Menu } from './style';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreData } from 'types/Login';
import { Container } from 'react-grid-system';

const Header: React.FC = () => {
  const [show, setShow] = useState(false);
  const state = useSelector((state: StoreData) => state);
  return (
    <>
      <Wrapper data-testid="header">
        <Container style={{ width: '100%' }}>
          <Menu>
            <Link href={'/dashboard'}>Guitar Notes</Link>
            <div style={{ marginTop: 8, cursor: 'pointer' }}>
              {state?.user?.token ? (
                <Image
                  data-testid="settings-icon"
                  layout="fixed"
                  alt="fixed"
                  height={24}
                  width={24}
                  src="/svg/settings.svg"
                  onClick={() => setShow(true)}
                />
              ) : (
                <Link href={'/'}>Entrar</Link>
              )}
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
