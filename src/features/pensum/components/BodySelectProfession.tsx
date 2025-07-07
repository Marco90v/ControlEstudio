import { SelectItem } from "@/components/ui/select"
import useProfessions from "@/store/useProfessions";
import { useFormContext } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";


const BodySelectProfession = () => {

  const { professions } = useProfessions(useShallow((state=>({  
    professions: state.professions,
  }))));

  const formPensum = useFormContext();
  const IdProfession = formPensum.watch("IdProfession");
  const semesters = professions.find(p => p.id === IdProfession)?.totalSemesters || 0;
    
  return (
    <>
      {Array.from({ length: semesters }, (_, i) => (
        <SelectItem key={i + 1} value={(i + 1).toString()}>
          Semester {i + 1}
        </SelectItem>
      ))}
    </>
  )
}

export default BodySelectProfession