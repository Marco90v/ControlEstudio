import { useEffect } from "react";
import { fetchTable } from "@/services/supabase";
import useClasses from "@/store/useClasses";
import { useShallow } from "zustand/react/shallow";
import type { Class } from "@/types";

export function useLoadClasses() {
  const { classes, setClasses, setLoading, setError } = useClasses(
    useShallow((state) => ({
      classes: state.classes,
      setClasses: state.setClasses,
      setLoading: state.setLoading,
      setError: state.setError,
    }))
  );

  useEffect(() => {
    if (classes.length > 0) return;

    const load = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await fetchTable<Class>("classes");

      if (error) {
        console.error(error);
        setError(error);
      } else if (data) {
        setClasses(data);
      }

      setLoading(false);
    };

    load();
  }, [classes.length, setClasses, setLoading, setError]);
}
