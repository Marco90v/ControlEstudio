// hooks/useLoadProfessions.ts
import { PROFESSIONS } from "@/lib/const";
import { fetchTable } from "@/services/supabase";
import useProfessions from "@/store/useProfessions";
import type { Profession } from "@/types";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export function useLoadProfessions() {
  const { professions, setProfessions,setLoading, setError } = useProfessions(
    useShallow((state) => ({
      professions: state.professions,
      setProfessions: state.setProfessions,
      setLoading: state.setLoading,
      setError: state.setError,
    }))
  );

  useEffect(() => {
    if (professions.length > 0) return;
    const load = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await fetchTable<Profession>(PROFESSIONS);

      if (error) {
        console.error(error);
        setError(error);
      } else if (data) {
        setProfessions(data);
      }

      setLoading(false);
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
