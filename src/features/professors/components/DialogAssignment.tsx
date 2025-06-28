import SelectForm from "@/components/common/SelectForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { mockClasses, mockProfessions, mockProfessors } from "@/data/mockData";
import type { ProfessorAssignment } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings } from "lucide-react";
import { useForm, type FieldValues } from "react-hook-form";
import { assignmentSchema } from "../schema";

interface Props {
  isAssignmentDialogOpen: boolean;
  setIsAssignmentDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const professors = mockProfessors;

// const initinalValues: ProfessorAssignment = {
//   id: '',
//   professorId: undefined,
//   professionId: undefined,
//   classId: undefined,
//   semester: undefined,
//   shift: 'Morning',
//   section: 'A'
// };

const DialogAssignment = ({isAssignmentDialogOpen, setIsAssignmentDialogOpen}:Props) => {

  const formAssignmentProfessor = useForm<ProfessorAssignment>({
    resolver: zodResolver(assignmentSchema),
    // defaultValues: initinalValues,
  });

  const resetAssignmentForm = () => {
    // console.log('resetAssignmentForm');
    setIsAssignmentDialogOpen((val) => !val);
  };

  const onSubmit = (data: FieldValues) => {
    console.log('onSubmited', data);
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('handleSave', formAssignmentProfessor);
    formAssignmentProfessor.setValue("id", crypto.randomUUID());
    formAssignmentProfessor.handleSubmit(onSubmit)();
    // console.log('handleAssignmentSubmit', data);
    // e.preventDefault();
  };

  return (
    <Dialog open={isAssignmentDialogOpen} onOpenChange={setIsAssignmentDialogOpen}>
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
                {professors.map((prof) => (
                  <SelectItem key={prof.id} value={prof.id}>
                    {prof.firstName} {prof.lastName}
                  </SelectItem>
                ))}
              </SelectForm>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <SelectForm name="professionId" label="Profession" placeholder="Select profession" >
                  {mockProfessions.map((prof) => (
                    <SelectItem key={prof.id} value={prof.id}>
                      {prof.name}
                    </SelectItem>
                  ))}
                </SelectForm>
              </div>
              <div>
                <SelectForm name="classId" label="Class" placeholder="Select class" >
                  {mockClasses.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.code} - {cls.name}
                    </SelectItem>
                  ))}
                </SelectForm>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <SelectForm name="semester" label="Semester" placeholder="Select semester" >
                  {Array.from({ length: 8 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      Semester {i + 1}
                    </SelectItem>
                  ))}
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
              {/* <Button type="submit" disabled={!selectedProfessor || !assignmentFormData.professionId || !assignmentFormData.classId}> */}
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