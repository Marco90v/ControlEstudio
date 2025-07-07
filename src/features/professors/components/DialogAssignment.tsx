import SelectForm from "@/components/common/SelectForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import type { ProfessorAssignment } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings } from "lucide-react";
import { useForm, type FieldValues } from "react-hook-form";
import { assignmentSchema } from "@/features/professors/schema";
import SelectSemesters from "@/components/common/SelectSemesters";
import SelectClasses from "@/features/professors/components/SelectClasses";
import SelectProfessions from "@/components/common/SelectProfessions";
import SelectProfessors from "@/features/professors/components/SelectProfessors";
import { addAssignmentSupabase } from "@/services/supabase";
import useProfessorAssignment from "@/store/useProfessorAssignment";
import { useShallow } from "zustand/react/shallow";

interface Props {
  isAssignmentDialogOpen: boolean;
  setIsAssignmentDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogAssignment = ({isAssignmentDialogOpen, setIsAssignmentDialogOpen}:Props) => {

  const {addProfessorAssignment} = useProfessorAssignment(useShallow((state=>({
    addProfessorAssignment: state.addProfessorAssignment,
  }))));

  const formAssignmentProfessor = useForm<ProfessorAssignment>({
    resolver: zodResolver(assignmentSchema),
  });

  const resetAssignmentForm = () => {
    setIsAssignmentDialogOpen((val) => !val);
  };

  const onSubmit = (data: FieldValues) => {
    addAssignmentSupabase(data as ProfessorAssignment).then((res)=>{
      if(res){
        addProfessorAssignment(data as ProfessorAssignment);
        closeDialog();
      }
    });
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    formAssignmentProfessor.setValue("id", crypto.randomUUID());
    formAssignmentProfessor.handleSubmit(onSubmit)();
  };

  const closeDialog = () => {
    onOpenChange();
  };

  const onOpenChange = () => {
    formAssignmentProfessor.reset();
    setIsAssignmentDialogOpen((val) => !val);
  }

  return (
    <Dialog open={isAssignmentDialogOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Assign Teaching
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Teaching Duties</DialogTitle>
        </DialogHeader>
        <Form {...formAssignmentProfessor}>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <SelectForm name="professorId" label="Professor" placeholder="Select professor" >
                <SelectProfessors />
              </SelectForm>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <SelectForm name="professionId" label="Profession" placeholder="Select profession" >
                  <SelectProfessions />
                </SelectForm>
              </div>
              <div>
                <SelectForm name="classId" label="Class" placeholder="Select class" >
                  <SelectClasses />
                </SelectForm>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <SelectForm name="semester" label="Semester" placeholder="Select semester" >
                  <SelectSemesters />
                </SelectForm>
              </div>
              <div>
                <SelectForm name="shift" label="Shift" placeholder="Select shift" >
                  <SelectItem value="Morning">Morning</SelectItem>
                  <SelectItem value="Afternoon">Afternoon</SelectItem>
                  <SelectItem value="Night">Night</SelectItem>
                </SelectForm>
              </div>
              <div>
                <SelectForm name="section" label="Section" placeholder="Select section" >
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                  <SelectItem value="C">Section C</SelectItem>
                </SelectForm>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={resetAssignmentForm}>
                Cancel
              </Button>
              <Button type="submit" disabled={false}>
                Assign
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAssignment;