import { fetchTable } from "@/services/supabase";
import useProfessors from "@/store/useProfessors";
import type { Professor } from "@/types";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export function useLoadProfessors() {
  const { professors, setProfessors, setLoading, setError } = useProfessors(
    useShallow((state) => ({
      professors: state.professors,
      setProfessors: state.setProfessors,
      setLoading: state.setLoading,
      setError: state.setError,
    }))
  );

  useEffect(() => {
    if (professors.length > 0) return;
    const load = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await fetchTable<Professor>("professors");

      if (error) {
        console.error(error);
        setError(error);
      } else if (data) {
        setProfessors(data);
      }

      setLoading(false);
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
