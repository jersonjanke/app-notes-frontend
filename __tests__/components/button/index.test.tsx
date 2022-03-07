import { render, screen } from '@testing-library/react';
import Button from 'components/Button';

describe('Home', () => {
  it('renders a heading', () => {
    const { getByText } = render(<Button label="btn-test" />);
    expect(getByText('btn-test')).toBeTruthy();
  });
});
