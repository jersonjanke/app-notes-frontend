import Title from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('<Title />', () => {
  it('should render <Title />', () => {
    render(<Title level={2}>Title Test</Title>);
    expect(screen.getByTestId('title')).toBeInTheDocument();
  });
});
