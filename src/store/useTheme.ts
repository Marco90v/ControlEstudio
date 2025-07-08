import { devtools, persist } from "zustand/middleware"

import { create } from "zustand"
import type { Theme } from "@/types"

type State = {
  theme: Theme;
  actualTheme: 'light' | 'dark';
}

type Action = {
  setTheme: (theme: Theme) => void;
  initTheme: () => void;
}

const useTheme = create<State & Action>()(devtools(
  persist(
    (set, get)=>({
      theme: 'system',
      actualTheme: 'light',
      setTheme: (theme) => {
        // localStorage.setItem('theme', theme);
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        const resolvedTheme =
          theme === 'system'
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light'
            : theme;

        root.classList.add(resolvedTheme);
        set({ theme, actualTheme: resolvedTheme });
      },
      initTheme: () => {
        // const saved = (localStorage.getItem('theme') as Theme) || 'system';
        const { theme } = get();
        get().setTheme(theme);
      },
    }),
    {
      name:"useTheme"
    }
  )
))

export default useTheme