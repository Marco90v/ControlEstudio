
import { useEffect } from "react";
import { fetchTable } from "@/services/supabase";
import { useShallow } from "zustand/react/shallow";
import usePensum from "@/store/usePensum";
import type { PensumEntry } from "@/types";

export function useLoadPensums() {
  const { pensums, setPensums, setLoading, setError } = usePensum(
    useShallow((state) => ({
      pensums: state.pensums,
      setPensums: state.setPensums,
      setLoading: state.setLoading,
      setError: state.setError,
    }))
  );

  useEffect(() => {
    if (pensums.length > 0) return;
    const load = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await fetchTable<PensumEntry>("pensum");

      if (error) {
        console.error(error);
        setError(error);
      } else if (data) {
        setPensums(data);
      }

      setLoading(false);
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
