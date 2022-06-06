import Spinner from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('<Spinner />', () => {
  it('should render <Spinner />', () => {
    render(<Spinner />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
