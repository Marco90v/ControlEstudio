
import { useEffect } from "react";
import { getAllPensum } from "@/services/supabase";
import { useShallow } from "zustand/react/shallow";
import usePensum from "@/store/usePensum";

export function useLoadPensums() {
  console.log("useLoadPensums");
  const { pensums, setPensums } = usePensum(
    useShallow((state) => ({
      pensums: state.pensums,
      setPensums: state.setPensums,
    }))
  );

  useEffect(() => {
    if (pensums.length === 0) {
      console.log("useEffect");
      getAllPensum().then((data) => {
        if (data) setPensums(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
