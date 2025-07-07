import { useEffect } from "react";
import { getAllStudents } from "@/services/supabase";
import { useShallow } from "zustand/react/shallow";
import useStudents from "@/store/useStudents";

export function useLoadStudents() {
  console.log("useLoadStudents");
  const { students, setStudents } = useStudents(
    useShallow((state) => ({
      students: state.students,
      setStudents: state.setStudents,
    }))
  );

  useEffect(() => {
    if (students.length === 0) {
      console.log("useEffect");
      getAllStudents().then((data) => {
        if (data) setStudents(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
