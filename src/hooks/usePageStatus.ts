import { useMemo } from 'react';

interface State {
  loading: boolean;
  error: string | null;
}

interface UsePageStatusResult {
  isLoading: boolean;
  firstError: string | null;
}

export function usePageStatus(states: State[]): UsePageStatusResult {
  return useMemo(() => {
    const isLoading = states.some((s) => s.loading);
    const firstError = states.find((s) => s.error)?.error ?? null;

    return { isLoading, firstError };
  }, [states]);
}
