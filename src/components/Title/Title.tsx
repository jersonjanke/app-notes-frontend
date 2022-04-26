import styled from 'styled-components';
import { primary } from 'utils/colors';

type HeadingProps = {
  level: 1 | 2 | 3;
  children: React.ReactNode;
};

export default function Title({ level, children }: HeadingProps) {
  const Component = {
    1: Heading1,
    2: Heading2,
    3: Heading3,
  }[level];

  return <Component>{children}</Component>;
}

const Heading1 = styled.h1`
  font-weight: 900;
  font-size: 36px;
  color: ${primary};
`;

const Heading2 = styled.h2`
  font-weight: 900;
  font-size: 24px;
  color: ${primary};
`;

const Heading3 = styled.h3`
  font-weight: 900;
  font-size: 18px;
  color: ${primary};
`;
