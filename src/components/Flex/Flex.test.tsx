import Flex from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('<Flex />', () => {
  it('should render <Flex />', () => {
    render(<Flex>Flex Test</Flex>);
    expect(screen.getByTestId('flex')).toBeInTheDocument();
  });
});
