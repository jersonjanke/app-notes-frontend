import { Wrapper } from './style';

type Props = {
  children: any;
  onClick?: () => void;
};

const DashboardCard: React.FC<Props> = ({ children, onClick }) => {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
};

export default DashboardCard;
