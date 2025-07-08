import { useCallback, useState } from 'react';
import type { Profession } from '@/types';
import ProfessionDialog from '@/features/professions/components/ProfessionDialog';
import CardProfession from '@/features/professions/components/CardProfession';
import Filter from '@/components/common/Filter';
import useProfessions from '@/store/useProfessions';
import { useShallow } from 'zustand/react/shallow';
import { useLoadProfessions } from '@/hooks/useLoadProfessions';
import NoData from '@/features/classes/components/NoData';
import { search } from '@/lib/utils';
import Spinner from '@/components/common/Spinner';
import { usePageStatus } from '@/hooks/usePageStatus';
import Error from '@/components/common/Error';

function Professions() {

  const professions = useProfessions(useShallow((s=>({ professions: s.professions, loading: s.loading, error: s.error }))));
  const states = [professions];
  const { isLoading, firstError } = usePageStatus(states);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProfession, setEditingProfession] = useState<Profession | null>(null);
  const filteredProfessions = search(professions.professions, searchTerm, ['names', 'code']);

  useLoadProfessions();
  
  const handleEdit = useCallback( (prof: Profession) => {
    setEditingProfession(prof);
    setIsDialogOpen(true);
  }, []);

  if (isLoading) return <Spinner />;
  if (firstError) return <Error error={firstError} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Professions</h1>
          <p className="text-muted-foreground">Manage university degree programs and majors</p>
        </div>
        <ProfessionDialog editingProfession={editingProfession} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} setEditingProfession={setEditingProfession} />
      </div>

      {/* Search */}
      <Filter setSearchTerm={setSearchTerm} placeholder={"Search professions by name or code..."} />

      {/* Professions Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProfessions.map((prof) => (
          <CardProfession key={prof.id} prof={prof} handleEdit={handleEdit} />
        ))}
      </div>

      <NoData data={filteredProfessions} searchTerm={searchTerm} textTrue='No professions found matching your search.' textFalse='No professions available.' />
      
    </div>
  );
}

export default Professions;