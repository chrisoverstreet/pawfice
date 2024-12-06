import { useEffect, useState } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export default function useBreakpoint(breakpoint: Breakpoint): boolean {
  const [isAboveBreakpoint, setIsAboveBreakpoint] = useState(
    window.innerWidth >= breakpoints[breakpoint],
  );

  useEffect(() => {
    function handleResize() {
      setIsAboveBreakpoint(window.innerWidth >= breakpoints[breakpoint]);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isAboveBreakpoint;
}
