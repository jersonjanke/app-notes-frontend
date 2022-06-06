import Input from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('<Input />', () => {
  it('should render <Input />', () => {
    render(<Input />);
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });
});
