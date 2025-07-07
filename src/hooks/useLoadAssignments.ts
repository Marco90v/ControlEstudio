import { getAllAssignments } from "@/services/supabase";
import useProfessorAssignment from "@/store/useProfessorAssignment";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export function useLoadAssignments() {
  console.log("useLoadAssignments");
  const { professorAssignments, setProfessorAssignments } = useProfessorAssignment(
    useShallow((state) => ({
      professorAssignments: state.professorAssignments,
      setProfessorAssignments: state.setProfessorAssignments,
    }))
  );

  useEffect(() => {
    if (professorAssignments.length === 0) {
      console.log("useEffect");
      getAllAssignments().then((data) => {
        if (data) setProfessorAssignments(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
