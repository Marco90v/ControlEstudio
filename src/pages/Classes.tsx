import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { Class } from '@/types';
import ClassDialog from '@/features/classes/components/ClassDialog';
import Filter from '@/components/common/Filter';
import CardClass from '@/features/classes/components/CardClass';
import useClasses from '@/store/useClasses';
import { useShallow } from 'zustand/react/shallow';
import { getAllClasses } from '@/services/supabase';

export function Classes() {

  const {classes, setClasses} = useClasses(useShallow((state=>({
    classes: state.classes,
    setClasses: state.setClasses,
  }))));

  useEffect(() => {
    if(classes.length === 0){
      getAllClasses().then((data)=>{
        if(data){
          setClasses(data);
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);

  const filteredClasses = classes.filter(cls =>
    cls.names.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = useCallback((cls: Class) => {
    setEditingClass(cls);
    setIsDialogOpen(true);
  }, []);

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
      <Filter setSearchTerm={setSearchTerm} placeholder='Search classes by name or code...' />

      {/* Classes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.map((cls) => (
          <CardClass key={cls.id} cls={cls} handleEdit={handleEdit} />
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