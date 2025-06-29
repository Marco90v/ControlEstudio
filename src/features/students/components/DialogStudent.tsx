import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm, type FieldValues } from "react-hook-form";
import { studentSchema } from "../schema";
import type { KeysStudent, Student } from "@/types";
import { Form } from "@/components/ui/form";
import InputForm from "@/components/common/InputForm";
import SelectForm from "@/components/common/SelectForm";
import { SelectItem } from "@/components/ui/select";
import { mockProfessions } from "@/data/mockData";
import { useEffect } from "react";

interface Props {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingStudent: UserType | null;
  setEditingStudent: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const DialogStudent = ({isDialogOpen, setIsDialogOpen, editingStudent, setEditingStudent}:Props) => {

  const formStudent = useForm<Student>({
    resolver: zodResolver(studentSchema),
    // defaultValues: initinalValues,
  });

  useEffect(() => {
    if (editingStudent) {
      // formStudent.setValue("id", editingStudent.id);
      // formStudent.setValue("firstName", editingStudent.firstName);
      // formStudent.setValue("lastName", editingStudent.lastName);
      // formStudent.setValue("email", editingStudent.email);
      // formStudent.setValue("contactNumber", editingStudent.contactNumber);
      // formStudent.setValue("gender", editingStudent.gender);
      // formStudent.setValue("professionId", editingStudent.professionId);
      // formStudent.setValue("currentSemester", editingStudent.currentSemester);
      // formStudent.setValue("profilePicture", editingStudent.profilePicture);
      console.log(editingStudent);
      Object.keys(editingStudent).forEach((key) => {
        formStudent.setValue(key as KeysStudent, editingStudent[key as KeysStudent]);
      });
    }
  }, [editingStudent, formStudent]);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!editingStudent) {
      formStudent.setValue("id", crypto.randomUUID());
    }
    formStudent.setValue("role", "Student");
    formStudent.handleSubmit(onSubmit)();
    
    // if (editingStudent) {
    //   setStudents(students.map(student => 
    //     student.id === editingStudent.id 
    //       ? { ...editingStudent, ...formData, role: 'Student' as const }
    //       : student
    //   ));
    // } else {
    //   const newStudent: UserType = {
    //     id: (students.length + 10).toString(),
    //     ...formData,
    //     role: 'Student'
    //   };
    //   setStudents([...students, newStudent]);
    // }
    
    // resetForm();
  };

  const resetForm = () => {
    formStudent.reset();
    setEditingStudent(null);
    setIsDialogOpen(false);
    // setFormData({
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   contactNumber: '',
    //   gender: 'Male',
    //   professionId: '',
    //   currentSemester: 1,
    //   profilePicture: ''
    // });
    // setEditingStudent(null);
    // setIsDialogOpen(false);
  };

  const handleEdit = (student: UserType) => {
    // setEditingStudent(student);
    // setFormData({
    //   firstName: student.firstName,
    //   lastName: student.lastName,
    //   email: student.email,
    //   contactNumber: student.contactNumber,
    //   gender: student.gender,
    //   professionId: student.professionId || '',
    //   currentSemester: student.currentSemester || 1,
    //   profilePicture: student.profilePicture || ''
    // });
    // setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    // setStudents(students.filter(student => student.id !== id));
  };

  const getProfessionName = (professionId?: string) => {
    // if (!professionId) return 'Not assigned';
    // const profession = mockProfessions.find(p => p.id === professionId);
    // return profession?.name || 'Unknown';
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
                  {mockProfessions.map((profession) => (
                    <SelectItem key={profession.id} value={profession.id}>
                      {profession.name}
                    </SelectItem>
                  ))}
                </SelectForm>
              </div>
              <div>
                <SelectForm name='currentSemester' label='Current Semester' placeholder="Select Current Semester">
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      Semester {i + 1}
                    </SelectItem>
                  ))}
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