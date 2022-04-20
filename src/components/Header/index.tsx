import { Container } from 'react-grid-system';
import Link from 'next/link';
import { Wrapper, Menu } from './style';

const Header: React.FC = () => {
  return (
    <Wrapper>
      <Container style={{ width: '100%' }}>
        <Menu>
          <Link href={'/dashboard'}>Guitar Notes</Link>
          <Link href={'/'}>Entrar</Link>
        </Menu>
      </Container>
    </Wrapper>
  );
};

export default Header;
