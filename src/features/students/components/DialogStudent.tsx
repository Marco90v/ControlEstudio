import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm, type FieldValues } from "react-hook-form";
import { studentSchema } from "@/features/students/schema";
import type { KeysStudent, Student } from "@/types";
import { Form } from "@/components/ui/form";
import InputForm from "@/components/common/InputForm";
import SelectForm from "@/components/common/SelectForm";
import { SelectItem } from "@/components/ui/select";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import SelectProfessions from "@/components/common/SelectProfessions";
import SelectSemesters from "@/components/common/SelectSemesters";
import { addStudentSupabase, updateStudentSupabase } from "@/services/supabase";
import useStudents from "@/store/useStudents";
import { alert } from "@/lib/utils";

interface Props {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingStudent: Student | null;
  setEditingStudent: React.Dispatch<React.SetStateAction<Student | null>>;
}

const DialogStudent = ({isDialogOpen, setIsDialogOpen, editingStudent, setEditingStudent}:Props) => {

  const {addStudent, updateStudent} = useStudents(useShallow((state=>({
    addStudent: state.addStudent,
    updateStudent: state.updateStudent,
  }))));

  const formStudent = useForm<Student>({
    resolver: zodResolver(studentSchema),
  });

  useEffect(() => {
    if (editingStudent) {
      Object.keys(editingStudent).forEach((key) => {
        formStudent.setValue(key as KeysStudent, editingStudent[key as KeysStudent]);
      });
    }
  }, [editingStudent, formStudent]);

  const onSubmit = (data: FieldValues) => {
    if(!editingStudent) {
      addStudentSupabase(data as Student).then((res) => {
        if (res) addStudent(data as Student);
        alert("Students","Student added successfully");
        closeDialog();
      });
    } else {
      updateStudentSupabase(data as Student).then((res) => {
        if (res) updateStudent(data as Student);
        alert("Students","Student updated successfully");
        closeDialog();
      });
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!editingStudent) {
      formStudent.setValue("id", crypto.randomUUID());
    }
    formStudent.setValue("role", "Student");
    formStudent.setValue("profilePicture", undefined);
    formStudent.handleSubmit(onSubmit)();
  };

  const resetForm = () => {
    formStudent.reset();
    setEditingStudent(null);
    setIsDialogOpen(false);
  };

  const closeDialog = () => {
    onOpenChange();
  };

  const onOpenChange = () => {
    formStudent.reset();
    setEditingStudent(null);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingStudent ? 'Edit Student' : 'Add New Student'}
          </DialogTitle>
        </DialogHeader>
        <Form {...formStudent}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <InputForm name='firstName' label='First Name' placeholder="First Name" />
              </div>
              <div>
                <InputForm name='lastName' label='Last Name' placeholder="Last Name" />
              </div>
            </div>
            
            <div>
                <InputForm name='email' label='Email' placeholder="Email" type="email" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <InputForm name='contactNumber' label='Contact Number' placeholder="Contact Number" />
              </div>
              <div>
                <SelectForm name='gender' label='Gender' placeholder="Select Gender">
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectForm>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <SelectForm name='professionId' label='Profession' placeholder="Select Profession">
                  <SelectProfessions />
                </SelectForm>
              </div>
              <div>
                <SelectForm name='currentSemester' label='Current Semester' placeholder="Select Current Semester">
                  <SelectSemesters />
                </SelectForm>
              </div>
            </div>
            
            <div>
              <InputForm name='profilePicture' label='Profile Picture URL (Optional)' type="url" placeholder="https://example.com/profile.jpg" disabled={true} />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button type="submit">
                {editingStudent ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogStudent;