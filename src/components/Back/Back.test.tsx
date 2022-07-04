import Back from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('<Back />', () => {
  it('should render <Back />', () => {
    render(<Back />);
    expect(screen.getByTestId('back')).toBeInTheDocument();
  });
});
