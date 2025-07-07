import { SelectItem } from "@/components/ui/select";
import { useLoadProfessions } from "@/hooks/useLoadProfessions";
import useProfessions from "@/store/useProfessions";
import { useFormContext } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

const SelectSemesters = () => {

  const { professions } = useProfessions(useShallow((state=>({
    professions: state.professions,
  }))));

  useLoadProfessions();

  const form = useFormContext();
  const professionId = form.watch("professionId");
  if(!professionId) return null;
  const semesters = professions.find(p => p.id === professionId)?.totalSemesters || 15;

  return (
    Array.from({ length: semesters }, (_, i) => (
      <SelectItem key={i + 1} value={(i + 1).toString()}>
        Semester {i + 1}
      </SelectItem>
    ))
  );
};

export default SelectSemesters;