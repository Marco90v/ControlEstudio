import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useFormContext, type FieldValues } from "react-hook-form";
import SelectForm from "@/components/common/SelectForm";
import BodySelectClass from "@/features/pensum/components/BodySelectClass";
import BodySelectProfession from "@/features/pensum/components/BodySelectProfession";
import Check from "@/components/common/Check";
import { addPensumSupabase } from "@/services/supabase";
import usePensum from "@/store/usePensum";
import { useShallow } from "zustand/react/shallow";
import type { PensumEntry } from "@/types";

interface Props {
  isDialogOpen: boolean
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PensumDialog = ({isDialogOpen, setIsDialogOpen}:Props) => {  

  const {addPensum} = usePensum(useShallow((state=>({
    addPensum: state.addPensum,
  }))));

  const formPensum = useFormContext();

  const onSubmit = (data:FieldValues) => {
    addPensumSupabase(data as PensumEntry).then((res)=>{
      if(res){
        addPensum(data as PensumEntry);
        closeDialog();
      }
    });
  }

  const handlerSave = (e: React.FormEvent) => {
    e.preventDefault();
    formPensum.setValue("id", crypto.randomUUID());
    if(formPensum.getValues("isElective") === undefined){
      formPensum.setValue("isElective", false);
    }
    formPensum.handleSubmit(onSubmit)();
  }

  const closeDialog = () => {
    onOpenChange();
  };

  const onOpenChange = () => {
    formPensum.setValue("id", undefined);
    formPensum.setValue("isElective", undefined);
    formPensum.setValue("IdClasse", undefined);
    formPensum.setValue("IdSemester", undefined);
    setIsDialogOpen((val) => !val);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Class to Curriculum
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Class to Curriculum</DialogTitle>
        </DialogHeader>
          <form onSubmit={handlerSave} className="space-y-4">
            <SelectForm name='IdClasse' label='Class' placeholder="Select a class">
              <BodySelectClass />
            </SelectForm>
            <SelectForm name='IdSemester' label='Semester' placeholder="Select a semester">
              <BodySelectProfession />
            </SelectForm>
            <Check name="isElective" label="Elective Course" />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit">
                Add to Curriculum
              </Button>
            </div>
          </form>
      </DialogContent>
    </Dialog>
  )
}

export default PensumDialog