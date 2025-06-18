import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { mockClasses } from '@/data/mockData';
import type { Class } from '@/types';
import ClassDialog from '@/features/classes/components/ClassDialog';
import Filter from '@/features/classes/components/Filter';
import CardClass from '@/features/classes/components/CardClass';

export function Classes() {

  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);

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

  // const onSubmit = async (data: Class) => {
  //   console.log(data);

  // }

  // const resetForm = () => {
  //   // setFormData({ name: '', code: '', credits: 0, description: '' });
  //   // setEditingClass(null);
  //   // setIsDialogOpen(false);
  //   formClass.reset();
  //   formClass.setValue("id", crypto.randomUUID());
  //   // formClass.setValue("name", "asdadasdasd");
  //   // formClass.setValue("code", "aasdadsasd");
  //   // formClass.setValue("credits", 2);
  //   // formClass.setValue("description", "asdasdadadasdas");
  // };

  // const closeDialog = () => {
  //   setIsDialogOpen(false);
  //   setEditingClass(null);
  // };

  const handleEdit = (cls: Class) => {
    setEditingClass(cls);
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
        <ClassDialog editingClass={editingClass} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} setEditingClass={setEditingClass} />
      </div>

      {/* Search */}
      <Filter setSearchTerm={setSearchTerm} />

      {/* Classes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.map((cls) => (
          <CardClass key={cls.id} cls={cls} handleEdit={handleEdit} handleDelete={handleDelete} />
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