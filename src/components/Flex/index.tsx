import { HTMLAttributes } from 'react';
import { Wrapper } from './style';

export type FlexItemProps = {
  order?: number;
  flexGrow?: number;
  flexShrink?: number;
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'stretch';
};

export type FlexContainerProps = {
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'start'
    | 'end'
    | 'left'
    | 'right';
  alignItems?:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'first baseline'
    | 'last baseline'
    | 'start'
    | 'end'
    | 'self-start'
    | 'self-end';
  alignContent?:
    | 'normal'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'
    | 'start'
    | 'end'
    | 'baseline'
    | 'first baseline'
    | 'last baseline';
  gap?: string;
  columnGap?: string;
  rowGap?: string;
};

export type FlexProps = HTMLAttributes<HTMLDivElement> &
  FlexContainerProps &
  FlexItemProps & {
    children: React.ReactNode;
  };

const Flex: React.FC<FlexProps> = ({ children, ...props }) => {
  return (
    <Wrapper data-testid="flex" {...props}>
      {children}
    </Wrapper>
  );
};

export default Flex;
