import Link from 'next/link';
import { Wrapper, Menu } from './style';
import Settings from '../Settings';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreData } from 'types/Login';
import settingsIcon from '../../../public/icons/settings.svg';
import Image from 'next/image';
import { Container } from 'react-grid-system';

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
              {state?.user?.token ? (
                <Image src={settingsIcon} onClick={() => setShow(true)} />
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
