import Stepper from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('<Stepper />', () => {
  it('should render <Stepper />', () => {
    render(<Stepper items={[1, 2, 3]} level={0} />);
    expect(screen.getByTestId('stepper')).toBeInTheDocument();
  });

  it('should render <Stepper />', () => {
    render(<Stepper items={[0, 1, 2]} level={0} />);
    expect(screen.getByTestId('stepper-item-0')).toHaveStyle(
      `background-color: rgb(29, 208, 94)`
    );
  });
});
