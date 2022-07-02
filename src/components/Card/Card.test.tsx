import Card from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('<Card/>', () => {
  it('should render <Card />', () => {
    render(
      <Card>
        <p>Hello Test</p>
      </Card>
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
  });
});
