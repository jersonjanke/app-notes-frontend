import { useEffect, useState } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg';

export interface WindowSize {
  width: number | undefined;
  height: number | undefined;
  isSmallScreen: boolean;
  isSm: boolean;
  isSmMd: boolean;
  isOver: (breakpoint: Breakpoint) => boolean;
  isBetween: (from: Breakpoint, to: Breakpoint) => boolean;
}

export default function useWindowSize(): WindowSize {
  const breakpoints = {
    sm: 740,
    md: 990,
    lg: 1140,
  };

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
    isSmallScreen: false,
    isSm: false,
    isSmMd: false,
    isBetween: () => false,
    isOver: () => false,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isSmallScreen: window.innerWidth <= breakpoints.sm,
        isSm: window.innerWidth <= breakpoints.sm,
        isSmMd: window.innerWidth <= breakpoints.md,

        isBetween: (from: Breakpoint, to: Breakpoint) =>
          window.innerWidth >= breakpoints[from] &&
          window.innerWidth <= breakpoints[to],
        isOver: (breakpoint: Breakpoint) =>
          window.innerWidth >= breakpoints[breakpoint],
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return windowSize;
}
