import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { PensumEntry } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form";
import { pensumSchema } from "@/features/classes/pensum/schema";
import SelectForm from "@/components/common/SelectForm";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import BodySelectClass from "./BodySelectClass";
import BodySelectProfession from "./BodySelectProfession";

interface Props {
  selectedProfession: string
  isDialogOpen: boolean
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const initinalValues: PensumEntry = {
  id: '',
  professionId: '',
  classId: '',
  semester: undefined,
  isElective: false
};

const PensumDialog = ({selectedProfession, isDialogOpen, setIsDialogOpen}:Props) => {  
  
  const formPensum = useForm<PensumEntry>({
    resolver: zodResolver(pensumSchema),
    defaultValues: initinalValues,
  });

  const [formData, setFormData] = useState({
    classId: '',
    semester: 1,
    isElective: false
  });

  const onSubmit = (data: PensumEntry) => {
    console.log(data);
  }

  const handlerSave = (e: React.FormEvent) => {
    e.preventDefault();
    formPensum.setValue("id", crypto.randomUUID());
    formPensum.setValue("professionId", selectedProfession);
    formPensum.handleSubmit(onSubmit)();
  }

  const closeDialog = () => {
    onOpenChange();
  };

  const onOpenChange = () => {
    formPensum.reset();
    // setEditingClass(null);
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
        <Form {...formPensum}>
          <form onSubmit={handlerSave} className="space-y-4">
            <SelectForm name='classId' label='Class' placeholder="Select a class">
              <BodySelectClass selectedProfession={selectedProfession} />
            </SelectForm>
            <SelectForm name='semester' label='Semester' placeholder="Select a semester">
              <BodySelectProfession selectedProfession={selectedProfession} />
            </SelectForm>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isElective"
                checked={formData.isElective}
                onCheckedChange={(checked) => setFormData({ ...formData, isElective: !!checked })}
              />
              <Label htmlFor="isElective">Elective Course</Label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              {/* <Button type="submit" disabled={!formData.classId}> */}
              <Button type="submit">
                Add to Curriculum
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default PensumDialog