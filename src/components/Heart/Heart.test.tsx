import Heart from './';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('<Heart />', () => {
  it('should render <Heart />', () => {
    render(<Heart size={0} opacity={0} />);
    expect(screen.getByTestId('heart')).toBeInTheDocument();
  });
});
