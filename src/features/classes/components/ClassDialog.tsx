import InputForm from "@/components/common/InputForm"
import TextareaForm from "@/components/common/TextareaForm"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { classSchema } from "@/features/classes/schema"
import type { Class, KeysClass } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

interface Props {
  editingClass: Class | null
  isDialogOpen: boolean
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  setEditingClass: React.Dispatch<React.SetStateAction<Class | null>>
}

const initinalValues: Class = {
  id: '',
  name: '',
  code: '',
  credits: 0,
  description: ''
};

const ClassDialog = ({editingClass, isDialogOpen, setIsDialogOpen, setEditingClass}:Props) => {

  const formClass = useForm<Class>({
    resolver: zodResolver(classSchema),
    defaultValues: initinalValues,
  });

  useEffect(() => {
    if(editingClass) {
      Object.keys(editingClass).forEach((key) => {
        formClass.setValue(key as KeysClass, editingClass[key as KeysClass]);
      });
    }
  }, [editingClass, formClass]);

  const onSubmit = (data: Class) => {
    console.log(data);
  }

  const handlerSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClass) {
      formClass.setValue("id", crypto.randomUUID());
    }
    formClass.handleSubmit(onSubmit)();
  }

  const closeDialog = () => {
    onOpenChange();
  };

  const onOpenChange = () => {
    formClass.reset();
    setEditingClass(null);
    setIsDialogOpen((val) => !val);
  }
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Class
        </Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[35rem]">
        <DialogHeader>
          <DialogTitle>
            {editingClass ? 'Edit Class' : 'Add New Class'}
          </DialogTitle>
        </DialogHeader>
        <Form {...formClass}>
          <form onSubmit={handlerSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputForm name='name' label='Class Name' />
              <InputForm name='code' label='Class Code' />
            </div>
            <InputForm name='credits' label='Credits' type='number' min={1} max={10} />
            <TextareaForm name='description' label='Description (Optional)' rows={3} />

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit" className="cursor-pointer">
                {editingClass ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ClassDialog