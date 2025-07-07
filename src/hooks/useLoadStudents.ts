import { useEffect } from "react";
import { getAllStudents, getStudentById } from "@/services/supabase";
import { useShallow } from "zustand/react/shallow";
import useStudents from "@/store/useStudents";
import useAuth from "@/store/AuthStore";
import { getRoles } from "@/lib/utils";
import type { Student } from "@/types";

export function useLoadStudents() {
  console.log("useLoadStudents");
  const { students, setStudents } = useStudents(
    useShallow((state) => ({
      students: state.students,
      setStudents: state.setStudents,
    }))
  );
  const {profile} = useAuth(useShallow((state)=>({
    profile: state.profile,
  })));

  useEffect(() => {
    if (students.length === 0) {
      console.log("useEffect");
      if(getRoles(profile?.role) === 'Admin'){
        getAllStudents().then((data) => {
          if (data) setStudents(data);
        });
      }else{
        if(profile?.userUID === undefined) return;
        getStudentById(profile?.userUID).then((data) => {
          if (data) setStudents(data as Student[]); 
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);
}
