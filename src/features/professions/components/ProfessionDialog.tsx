import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import type { KeysProfession, Profession } from '@/types';
import InputForm from "@/components/common/InputForm";
import TextareaForm from "@/components/common/TextareaForm";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { professionSchema } from "../schema";
import { useEffect } from "react";

interface Props {
  editingProfession: Profession | null;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingProfession: React.Dispatch<React.SetStateAction<Profession | null>>;
}

const initinalValues: Profession = {
  id: '',
  name: '',
  code: '',
  totalSemesters: 10,
  description: ''
};

const ProfessionDialog = ({editingProfession, isDialogOpen, setIsDialogOpen, setEditingProfession}:Props) => {

  const formProfession = useForm<Profession>({
    resolver: zodResolver(professionSchema),
    defaultValues: initinalValues,
  });

  useEffect(() => {
    if(editingProfession) {
      Object.keys(editingProfession).forEach((key) => {
        formProfession.setValue(key as KeysProfession, editingProfession[key as KeysProfession]);
      });
    }
  }, [editingProfession, formProfession]);
  
  const onSubmit = (data: Profession) => {
    console.log(data);
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProfession) {
      formProfession.setValue("id", crypto.randomUUID());
    }
    formProfession.handleSubmit(onSubmit)();
  }

  const closeDialog = () => {
    onOpenChange();
  };

  const onOpenChange = () => {
    formProfession.reset();
    setEditingProfession(null);
    setIsDialogOpen((val) => !val);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Profession
        </Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[35rem]">
        <DialogHeader>
          <DialogTitle>
            {editingProfession ? 'Edit Profession' : 'Add New Profession'}
          </DialogTitle>
        </DialogHeader>
        <Form {...formProfession}>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputForm name='name' label='Class Name' />
              <InputForm name='code' label='Code' />
            </div>
            <InputForm name='totalSemesters' label='Total Semesters' min={6} max={16} type='number' />
            <TextareaForm name='description' label='Description (Optional)' rows={3} />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingProfession ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ProfessionDialog