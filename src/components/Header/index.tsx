import { Container } from 'react-grid-system';
import { Wrapper, Menu, ItemMenu } from './style';

const Header: React.FC = () => {
  return (
    <Wrapper>
      <Container style={{ width: '100%' }}>
        <Menu>
          <ItemMenu href={'/dashboard'}>Guitar Notes</ItemMenu>
          <ItemMenu href={'/'}>Entrar</ItemMenu>
        </Menu>
      </Container>
    </Wrapper>
  );
};

export default Header;
