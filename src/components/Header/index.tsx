import { Container } from 'react-grid-system';
import { Wrapper, Menu, ItemMenu } from './style';

const Header: React.FC = () => {
  return (
    <Wrapper>
      <Container style={{ width: '100%' }}>
        <Menu>
          <ItemMenu>App Notes</ItemMenu>
          <ItemMenu>Entrar</ItemMenu>
        </Menu>
      </Container>
    </Wrapper>
  );
};

export default Header;
