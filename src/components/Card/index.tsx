import { Wrapper } from './style';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Card: React.FC<Props> = ({ children, onClick }) => {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
};

export default Card;
