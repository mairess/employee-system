/* eslint-disable max-len */

'use client';

import { useEffect, useState } from 'react';

function useWindowWidth() {
  const isClient = typeof window === 'object';

  const [windowWidth, setWindowWidth] = useState<number>(isClient ? window.innerWidth : 0);

  useEffect(() => {
    if (!isClient) return;

    const handleSize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleSize);

    return () => window.removeEventListener('resize', handleSize);
  }, [isClient]);
  return windowWidth;
}

export default useWindowWidth;
