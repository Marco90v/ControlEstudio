import { SelectItem } from "@/components/ui/select";
import { useLoadProfessions } from "@/hooks/useLoadProfessions";
import useProfessions from "@/store/useProfessions";
import { useShallow } from "zustand/react/shallow";

const SelectProfessions = () => {
  const {professions} = useProfessions(useShallow((state=>({
    professions: state.professions,
  }))));
  useLoadProfessions();
  return (
    professions.map((prof) => (
      <SelectItem key={prof.id} value={prof.id}>
        {prof.names}
      </SelectItem>
    ))
  );
};

export default SelectProfessions;