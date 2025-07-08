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
import Error from '@/components/common/Error';
import { usePageStatus } from '@/hooks/usePageStatus';

function Classes() {

  const classes = useClasses(useShallow((s=>({ classes: s.classes, loading: s.loading, error: s.error }))));
  const states = [classes];  
  const { isLoading, firstError } = usePageStatus(states);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);

  const filteredClasses = search(classes.classes, searchTerm, ['names', 'code']);
  useLoadClasses();
  
  const handleEdit = useCallback((cls: Class) => {
    setEditingClass(cls);
    setIsDialogOpen(true);
  }, []);

  if (isLoading) return <Spinner />;
  if (firstError) return <Error error={firstError} />;

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