import ButtonCircle from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('<ButtonCircle', () => {
  it('should render <ButtonCircle', () => {
    render(<ButtonCircle>Test</ButtonCircle>);
    expect(screen.getByTestId('buttonCircle')).toBeInTheDocument();
  });
});
