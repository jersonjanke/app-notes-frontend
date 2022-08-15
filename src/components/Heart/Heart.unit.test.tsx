import Heart from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('<Heart />', () => {
  it('should render <Heart />', () => {
    render(<Heart size={0} opacity={0} />);
    expect(screen.getByTestId('heart')).toBeInTheDocument();
  });
  it('should render 5 itens', () => {
    render(<Heart size={5} opacity={0} />);
    expect(screen.getByTestId('heart-4')).toBeInTheDocument();
  });
  it('should render 5 itens', () => {
    render(<Heart size={5} opacity={4} />);
    expect(screen.getByTestId('heart-4')).toHaveStyle('opacity: 1');
  });
});
