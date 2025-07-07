import { useEffect } from "react";
import { getAllClasses } from "@/services/supabase";
import useClasses from "@/store/useClasses";
import { useShallow } from "zustand/react/shallow";

export function useLoadClasses() {
  console.log("useLoadClasses");
  const { classes, setClasses } = useClasses(
    useShallow((state) => ({
      classes: state.classes,
      setClasses: state.setClasses,
    }))
  );

  useEffect(() => {
    if (classes.length === 0) {
      console.log("useEffect");
      getAllClasses().then((data) => {
        if (data) setClasses(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
