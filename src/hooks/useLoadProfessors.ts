import { getAllProfessors } from "@/services/supabase";
import useProfessors from "@/store/useProfessors";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export function useLoadProfessors() {
  console.log("useLoadProfessors");
  const { professors, setProfessors } = useProfessors(
    useShallow((state) => ({
      professors: state.professors,
      setProfessors: state.setProfessors,
    }))
  );

  useEffect(() => {
    if (professors.length === 0) {
      console.log("useEffect");
      getAllProfessors().then((data) => {
        if (data) setProfessors(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
