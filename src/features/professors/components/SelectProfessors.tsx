import { SelectItem } from "@/components/ui/select";
import { useLoadProfessors } from "@/hooks/useLoadProfessors";
import useProfessors from "@/store/useProfessors";
import { useShallow } from "zustand/react/shallow";

const SelectProfessors = () => {
  const {professors} = useProfessors(useShallow((state=>({
    professors: state.professors,
  }))));
  useLoadProfessors();
  return (
    professors.map((prof) => (
      <SelectItem key={prof.id} value={prof.id}>
        {prof.firstName} {prof.lastName}
      </SelectItem>
    ))
  );
};

export default SelectProfessors;