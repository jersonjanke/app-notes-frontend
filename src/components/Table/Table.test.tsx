import Table from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('<Table />', () => {
  it('should render <Table />', () => {
    render(<Table />);
    expect(screen.getByTestId('table')).toBeInTheDocument();
  });
});
