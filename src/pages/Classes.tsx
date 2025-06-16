import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Textarea } from '@/components/ui/textarea';
import { mockClasses } from '@/data/mockData';
import type { Class } from '@/types';
import { useForm } from 'react-hook-form';
import { classSchema } from '@/features/schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from '@/components/ui/form';
import InputForm from '@/components/common/InputForm';
import TextareaForm from '@/components/common/TextareaForm';

const initinalValues: Class = {
  id: '',
  name: '',
  code: '',
  credits: 0,
  description: ''
};

export function Classes() {

  const formClass = useForm<Class>({  
    resolver: zodResolver(classSchema),
    defaultValues: initinalValues,
  });

  // console.log(formClass.formState.errors);

  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    credits: '0',
    description: ''
  });

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   if (editingClass) {
  //     setClasses(classes.map(cls => 
  //       cls.id === editingClass.id 
  //         ? { ...editingClass, ...formData }
  //         : cls
  //     ));
  //   } else {
  //     const newClass: Class = {
  //       id: (classes.length + 1).toString(),
  //       ...formData
  //     };
  //     setClasses([...classes, newClass]);
  //   }
    
  //   resetForm();
  // };

  const onSubmit = async (data: Class) => {
    console.log(data);

  }

  const resetForm = () => {
    // setFormData({ name: '', code: '', credits: 0, description: '' });
    // setEditingClass(null);
    // setIsDialogOpen(false);
    formClass.reset();
    formClass.setValue("id", crypto.randomUUID());
    // formClass.setValue("name", "asdadasdasd");
    // formClass.setValue("code", "aasdadsasd");
    // formClass.setValue("credits", 2);
    // formClass.setValue("description", "asdasdadadasdas");
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingClass(null);
  };

  const handleEdit = (cls: Class) => {
    setEditingClass(cls);
    setFormData({
      name: cls.name,
      code: cls.code,
      credits: cls.credits,
      description: cls.description || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setClasses(classes.filter(cls => cls.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Classes</h1>
          <p className="text-muted-foreground">Manage university classes and subjects</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingClass ? 'Edit Class' : 'Add New Class'}
              </DialogTitle>
            </DialogHeader>
            <Form {...formClass}>
              <form onSubmit={formClass.handleSubmit(onSubmit)} className="space-y-4">
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
                  <Button type="submit">
                    {editingClass ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search classes by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Classes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.map((cls) => (
          <Card key={cls.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{cls.name}</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    {cls.code}
                  </Badge>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(cls)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(cls.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Credits:</span>
                  <span className="font-medium">{cls.credits}</span>
                </div>
                {cls.description && (
                  <p className="text-sm text-muted-foreground">
                    {cls.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {searchTerm ? 'No classes found matching your search.' : 'No classes available.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}