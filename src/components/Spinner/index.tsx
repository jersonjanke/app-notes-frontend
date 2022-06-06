import { SpinnerWrapper } from './style';

const Spinner: React.FC = () => {
  return (
    <SpinnerWrapper data-testid="spinner">
      <div></div>
      <div></div>
    </SpinnerWrapper>
  );
};

export default Spinner;
