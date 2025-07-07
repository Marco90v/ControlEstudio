import { fetchTable } from "@/services/supabase";
import useProfessorAssignment from "@/store/useProfessorAssignment";
import type { ProfessorAssignment } from "@/types";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export function useLoadAssignments() {
  const { professorAssignments, setProfessorAssignments, setLoading, setError } = useProfessorAssignment(
    useShallow((state) => ({
      professorAssignments: state.professorAssignments,
      setProfessorAssignments: state.setProfessorAssignments,
      setLoading: state.setLoading,
      setError: state.setError,
    }))
  );

  useEffect(() => {
    if (professorAssignments.length > 0) return;
    const load = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await fetchTable<ProfessorAssignment>("assignments");

      if (error) {
        console.error(error);
        setError(error);
      } else if (data) {
        setProfessorAssignments(data);
      }

      setLoading(false);
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
