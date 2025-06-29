import InputForm from "@/components/common/InputForm";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react"
import { useForm, type FieldValues } from "react-hook-form";
import { professorSchema } from "../schema";
import type { KeysProfessor, Professor } from "@/types";
import SelectForm from "@/components/common/SelectForm";
import { SelectItem } from "@/components/ui/select";
import { useEffect } from "react";

interface Props {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingProfessor: React.Dispatch<React.SetStateAction<Professor | null>>;
  editingProfessor: Professor | null;
}

// const initinalValues: User = {
//   id: '',
//   firstName: '',
//   lastName: '',
//   email: '',
//   contactNumber: '',
//   gender: 'Male' as 'Male' | 'Female' | 'Other',
//   profilePicture: ''
// };

// const professorFormData = initinalValues;

const DialogProfessor = ({isDialogOpen, setIsDialogOpen, editingProfessor, setEditingProfessor}:Props) => {

  const formProfessor = useForm<Professor>({
    resolver: zodResolver(professorSchema),
    // defaultValues: initinalValues,
  });

  useEffect(() => {
    if (editingProfessor) {
      // formProfessor.setValue("id", editingProfessor.id);
      // formProfessor.setValue("firstName", editingProfessor.firstName);
      // formProfessor.setValue("lastName", editingProfessor.lastName);
      // formProfessor.setValue("email", editingProfessor.email);
      // formProfessor.setValue("contactNumber", editingProfessor.contactNumber);
      // formProfessor.setValue("gender", editingProfessor.gender);
      // formProfessor.setValue("profilePicture", editingProfessor.profilePicture);
      Object.keys(editingProfessor).forEach((key) => {
        formProfessor.setValue(key as KeysProfessor, editingProfessor[key as KeysProfessor]);
      });
    }
  }, [editingProfessor, formProfessor]);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  }

  const handleProfessorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!editingProfessor) {
      formProfessor.setValue("id", crypto.randomUUID());
    }
    formProfessor.setValue("role", "Professor");
    formProfessor.handleSubmit(onSubmit)();
  };

  const resetProfessorForm = () => {
    setIsDialogOpen(val=>!val)
  };

  const onOpenChange = () => {
    formProfessor.reset();
    setEditingProfessor(null);
    setIsDialogOpen((val) => !val);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Professor
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingProfessor ? 'Edit Professor' : 'Add New Professor'}
          </DialogTitle>
        </DialogHeader>
        <Form {...formProfessor}>
          <form onSubmit={handleProfessorSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <InputForm name='firstName' label='First Name' placeholder="First Name" />
              </div>
              <div>
                <InputForm name='lastName' label='Last Name' placeholder="Last Name" />
              </div>
            </div>
            <div>
              <InputForm name='email' label='Email' placeholder="Email" />
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
            <div>
              <InputForm name='profilePicture' label='Profile Picture URL (Optional)' type="url" placeholder="https://example.com/profile.jpg" disabled={true} />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={resetProfessorForm}>
                Cancel
              </Button>
              <Button type="submit">
                {editingProfessor ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogProfessor