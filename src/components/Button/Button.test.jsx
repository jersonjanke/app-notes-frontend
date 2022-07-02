import Button from './';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('<Button />', () => {
  it('should render <Button />', () => {
    render(<Button>Test</Button>);
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  it('should render label button', () => {
    render(<Button>Hello Test</Button>);
    expect(screen.getByText('Hello Test')).toBeInTheDocument();
  });

  it('should loading=true state', () => {
    render(<Button loading={true}>Hello Test</Button>);
    expect(screen.getByTestId('button')).toBeDisabled();
  });

  it('should click button', async () => {
    const mockOnClick = jest.fn();
    const { getByTestId } = render(
      <Button onClick={mockOnClick}>My Button</Button>
    );
    fireEvent.click(getByTestId('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
