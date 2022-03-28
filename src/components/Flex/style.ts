import styled, { css } from 'styled-components';
import { FlexItemProps, FlexProps, FlexContainerProps } from './';

export const flexItemModifier = ({
  order = 0,
  flexGrow = 0,
  flexShrink = 1,
  alignSelf = 'auto',
}: FlexItemProps) => css`
  order: ${order};
  flex-grow: ${flexGrow};
  flex-shrink: ${flexShrink};
  align-self: ${alignSelf};
`;

export const flexContainerModifier = ({
  flexDirection = 'row',
  flexWrap = 'nowrap',
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  alignContent = 'normal',
  gap,
  columnGap,
  rowGap,
}: FlexContainerProps) => css`
  flex-direction: ${flexDirection};
  flex-wrap: ${flexWrap};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  align-content: ${alignContent};
  gap: ${gap};
  ${columnGap &&
  css`
    column-gap: ${columnGap};
  `}
  ${rowGap &&
  css`
    row-gap: ${rowGap};
  `}
`;

type ContainerProps = Omit<FlexProps, 'as'>;

export const Wrapper = styled.div<ContainerProps>`
  ${({ ...props }) => css`
    width: 100%;
    display: flex;
    ${flexContainerModifier(props)}
    ${flexItemModifier(props)}
  `}
`;
