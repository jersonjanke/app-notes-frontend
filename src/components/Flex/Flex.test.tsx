import Flex from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('<Flex />', () => {
  it('should render <Flex />', () => {
    render(<Flex>Flex Test</Flex>);
    expect(screen.getByTestId('flex')).toBeInTheDocument();
  });

  it('should render <Flex />', () => {
    render(
      <Flex columnGap="12px" rowGap="12px">
        Flex Test
      </Flex>
    );
    expect(screen.getByTestId('flex')).toBeInTheDocument();
  });
});
