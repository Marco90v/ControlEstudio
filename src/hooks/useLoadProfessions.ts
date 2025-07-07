// hooks/useLoadProfessions.ts
import { getAllProfessions } from "@/services/supabase";
import useProfessions from "@/store/useProfessions";
import { useEffect } from "react";
// import { getAllProfessions } from "../api/professions";
// import { useProfessions } from "../store/useProfessions";
import { useShallow } from "zustand/react/shallow";

export function useLoadProfessions() {
  console.log("useLoadProfessions");
  const { professions, setProfessions } = useProfessions(
    useShallow((state) => ({
      professions: state.professions,
      setProfessions: state.setProfessions,
    }))
  );

  useEffect(() => {
    if (professions.length === 0) {
      console.log("useEffect");
      getAllProfessions().then((data) => {
        if (data) setProfessions(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
