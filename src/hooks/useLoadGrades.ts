import { getAllGrades } from "@/services/supabase";
import useGrades from "@/store/useGrades";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export function useLoadGrades() {
  console.log("useLoadGrades");
  const { grades, setGrades } = useGrades(
    useShallow((state) => ({
      grades: state.grades,
      setGrades: state.setGrades,
    }))
  );

  useEffect(() => {
    if (grades.length === 0) {
      console.log("useEffect");
      getAllGrades().then((data) => {
        if (data) setGrades(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
