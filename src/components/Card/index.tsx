import { Wrapper } from './style';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Card: React.FC<Props> = ({ children, onClick }) => {
  return (
    <Wrapper data-testid="card" onClick={onClick}>
      {children}
    </Wrapper>
  );
};

export default Card;
