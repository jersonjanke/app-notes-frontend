import InputPassword from '.';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

describe('<InputPassword />', () => {
  it('should render <InputPassword />', () => {
    render(<InputPassword />);
    expect(screen.getByTestId('inputPassword')).toBeInTheDocument();
  });

  it('should render <InputPassword /> with title', () => {
    render(<InputPassword title="test " />);
    expect(screen.getByTestId('inputPassword')).toBeInTheDocument();
  });

  it('should render <InputPassword /> with text', () => {
    render(<InputPassword title="test" />);
    fireEvent.click(screen.getByTestId('inputPassword-image'));
    fireEvent.click(screen.getByTestId('inputPassword-image'));

    expect(screen.getByTestId('input-field')).toHaveProperty(
      'type',
      'password'
    );
  });

  it('should render <InputPassword /> with text', () => {
    render(<InputPassword title="test" />);
    fireEvent.click(screen.getByTestId('inputPassword-image'));

    expect(screen.getByTestId('input-field')).toHaveProperty('type', 'text');
  });
});
