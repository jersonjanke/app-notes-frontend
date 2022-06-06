import { Wrapper } from './style';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const DashboardCard: React.FC<Props> = ({ children, onClick }) => {
  return (
    <Wrapper data-testid="dashboardCard" onClick={onClick}>
      {children}
    </Wrapper>
  );
};

export default DashboardCard;
