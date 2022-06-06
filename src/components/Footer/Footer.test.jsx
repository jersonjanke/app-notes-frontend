import Footer from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('<Footer />', () => {
  it('should render <Footer />', () => {
    render(<Footer />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
