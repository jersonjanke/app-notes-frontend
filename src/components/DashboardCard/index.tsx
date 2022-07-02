import { Wrapper, WrapperDisabled } from './style';

type Props = {
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

const DashboardCard: React.FC<Props> = ({ disabled, children, onClick }) => {
  return (
    <>
      {disabled ? (
        <WrapperDisabled data-testid="dashboardCardDisabled">
          {children}
        </WrapperDisabled>
      ) : (
        <Wrapper data-testid="dashboardCard" onClick={onClick}>
          {children}
        </Wrapper>
      )}
    </>
  );
};

export default DashboardCard;
