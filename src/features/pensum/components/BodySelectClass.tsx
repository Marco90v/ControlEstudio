import { SelectItem } from "@/components/ui/select"
import { useLoadClasses } from "@/hooks/useLoadClasses";
import useClasses from "@/store/useClasses";
import { useShallow } from "zustand/react/shallow";

const BodySelectClass = () => {

  const {classes} = useClasses(useShallow((state=>({
    classes: state.classes,
  }))));

  useLoadClasses();

  return (
    <>
      {classes.map((cls) => (
        <SelectItem key={cls.id} value={cls.id}>
          {cls.code} - {cls.names} ({cls.credits} credits)
        </SelectItem>
      ))}
    </>
  )
}

export default BodySelectClass