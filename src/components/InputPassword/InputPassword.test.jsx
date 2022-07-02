import InputPassword from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('<InputPassword />', () => {
  it('should render <InputPassword />', () => {
    render(<InputPassword />);
    expect(screen.getByTestId('inputPassword')).toBeInTheDocument();
  });

  it('should render <InputPassword /> with title', () => {
    render(<InputPassword title="test " />);
    expect(screen.getByTestId('inputPassword')).toBeInTheDocument();
  });
});
