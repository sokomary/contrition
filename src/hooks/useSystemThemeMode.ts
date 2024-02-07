import { useEffect, useMemo, useState } from 'react';

export const useSystemThemeMode = () => {
  const modeQuery = useMemo(
    () => window.matchMedia('(prefers-color-scheme: dark)'),
    [],
  );
  const [dark, setDark] = useState(!!modeQuery.matches);

  useEffect(() => {
    const change = () => setDark(!!modeQuery.matches);
    if ('addEventListener' in modeQuery) {
      modeQuery.addEventListener('change', change);
    }
    if ('addListener' in modeQuery) {
      modeQuery.addListener(change);
    }

    return () => {
      if ('removeEventListener' in modeQuery) {
        modeQuery.removeEventListener('change', change);
      }
      if ('removeListener' in modeQuery) {
        modeQuery.removeListener(change);
      }
    };
  }, [modeQuery]);

  return dark ? 'dark' : 'light';
};
