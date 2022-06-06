import Button from './';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('<Button />', () => {
  it('should render <Button />', () => {
    render(<Button>Test</Button>);
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });
});
