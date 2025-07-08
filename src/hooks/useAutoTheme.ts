import useTheme from '@/store/useTheme';
import { useEffect } from 'react';

export function useAutoTheme() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = () => {
      setTheme('system'); // ya resuelve internamente light/dark
    };

    mediaQuery.addEventListener('change', updateTheme);
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [theme, setTheme]);
}
