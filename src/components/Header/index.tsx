import Link from 'next/link';
import Image from 'next/image';
import { Wrapper, Menu } from './style';
import { Container } from 'react-grid-system';
import { pages } from 'utils/pages';

const Header: React.FC<{ showSettings: boolean }> = ({ showSettings }) => {
  return (
    <>
      <Wrapper data-testid="header">
        <Container style={{ width: '100%' }}>
          <Menu>
            <Link href={pages.dashboard}>Guitar Notes</Link>
            <div style={{ marginTop: 8, cursor: 'pointer' }}>
              {showSettings ? (
                <Link href={pages.settings} passHref>
                  <Image
                    data-testid="settings-icon"
                    layout="fixed"
                    alt="fixed"
                    height={24}
                    width={24}
                    src="/svg/settings.svg"
                  />
                </Link>
              ) : (
                <Link href={'/'}>Entrar</Link>
              )}
            </div>
          </Menu>
        </Container>
      </Wrapper>
    </>
  );
};

export default Header;
