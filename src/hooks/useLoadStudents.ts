import { useEffect } from "react";
import { fetchTable, getStudentById } from "@/services/supabase";
import { useShallow } from "zustand/react/shallow";
import useStudents from "@/store/useStudents";
import useAuth from "@/store/AuthStore";
import { getRoles } from "@/lib/utils";
import type { Student } from "@/types";
import { ADMIN, STUDENTS } from "@/lib/const";

export function useLoadStudents() {
  const { students, setStudents, setLoading, setError } = useStudents(
    useShallow((state) => ({
      students: state.students,
      setStudents: state.setStudents,
      setLoading: state.setLoading,
      setError: state.setError,
    }))
  );
  const {profile} = useAuth(useShallow((state)=>({
    profile: state.profile,
  })));

  useEffect(() => {
    if (students.length > 0) return;
    if (!profile?.role) return;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        if (getRoles(profile.role) === ADMIN) {
          const { data, error } = await fetchTable<Student>(STUDENTS);
          if (error) return setError(error);
          if (data) setStudents(data);
        } else {
          if (!profile.userUID) return;
          const { data, error } = await getStudentById(profile.userUID);
          if (error) return setError(error);
          if (data) setStudents(Array.isArray(data) ? data : [data]);
        }
      } catch (error) {
        console.error(error);
        setError("Error loading students");
      } finally {
        setLoading(false);
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);
}
