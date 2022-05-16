import styled from 'styled-components';
import { transparentize } from 'polished';
import { primary, white } from 'utils/colors';

export interface ProgressBarProps {
  progress: number;
  width?: number;
}

export default function ProgressBar(props: ProgressBarProps) {
  return (
    <ProgressBarWrapper style={{ width: props.width || 'auto' }}>
      <CurrentProgress progress={props.progress}></CurrentProgress>
    </ProgressBarWrapper>
  );
}

const ProgressBarWrapper = styled.div`
  height: 4px;
  border-radius: 8px;
  color: ${white};
  background-color: ${transparentize(0.85, primary)};
  position: relative;
  margin-bottom: 24px;
`;

const CurrentProgress = styled.div<{
  progress: number;
}>`
  height: 100%;
  background-color: ${primary};
  width: ${(p) => p.progress}%;
  display: flex;
  align-items: center;
  font-size: 14px;
  text-transform: lowercase;
  overflow: hidden;
  white-space: nowrap;
  ${(p) => (p.progress > 0 ? 'padding-left: 4px;' : '')}
  transition: .25s ease;
  z-index: 2;
  position: relative;
`;
