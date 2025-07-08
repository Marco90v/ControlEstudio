import { useCallback, useState } from 'react';
import type { Class } from '@/types';
import ClassDialog from '@/features/classes/components/ClassDialog';
import Filter from '@/components/common/Filter';
import CardClass from '@/features/classes/components/CardClass';
import useClasses from '@/store/useClasses';
import { useShallow } from 'zustand/react/shallow';
import NoData from '@/features/classes/components/NoData';
import { search } from '@/lib/utils';
import { useLoadClasses } from '@/hooks/useLoadClasses';
import Spinner from '@/components/common/Spinner';

function Classes() {

  const {classes, loading, error} = useClasses(useShallow((state=>({
    classes: state.classes,
    loading: state.loading,
    error: state.error,
  }))));

  useLoadClasses();

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);

  const filteredClasses = search(classes, searchTerm, ['names', 'code']);
  
  const handleEdit = useCallback((cls: Class) => {
    setEditingClass(cls);
    setIsDialogOpen(true);
  }, []);

  if(error){
    return <div>Error: {error}</div>;
  };
  if(loading){
    return <Spinner />;
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
      <Filter setSearchTerm={setSearchTerm} placeholder='Search classes by name or code...' />

      {/* Classes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.map((cls) => (
          <CardClass key={cls.id} cls={cls} handleEdit={handleEdit} />
        ))}
      </div>

      <NoData data={filteredClasses} searchTerm={searchTerm} textTrue='No classes found matching your search.' textFalse='No classes available.' />
    </div>
  );
}

export default Classes;