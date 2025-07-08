import { useEffect } from 'react';
import useTheme from '@/store/useTheme';
import { useShallow } from 'zustand/react/shallow';
import { useAutoTheme } from '@/hooks/useAutoTheme';

function Theme({ children }: { children: React.ReactNode }) {
  const {initTheme} = useTheme(useShallow((s)=>({initTheme: s.initTheme})));
  useAutoTheme(); // detecta automáticamente si cambia el tema del sistema

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return <>{children}</>;
}

export default Theme;