import { GRADES } from "@/lib/const";
import { fetchTable } from "@/services/supabase";
import useGrades from "@/store/useGrades";
import type { Grade } from "@/types";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export function useLoadGrades() {
  const { grades, setGrades, setLoading, setError } = useGrades(
    useShallow((state) => ({
      grades: state.grades,
      setGrades: state.setGrades,
      setLoading: state.setLoading,
      setError: state.setError,
    }))
  );

  useEffect(() => {
    if (grades.length > 0) return;
    const load = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await fetchTable<Grade>(GRADES);

      if (error) {
        console.error(error);
        setError(error);
      } else if (data) {
        setGrades(data);
      }

      setLoading(false);
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
