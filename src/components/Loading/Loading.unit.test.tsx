import Loading from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('<Loading />', () => {
  it('should render <Loading />', () => {
    render(<Loading />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
