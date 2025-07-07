import { useCallback, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { Profession } from '@/types';
import ProfessionDialog from '@/features/professions/components/ProfessionDialog';
import CardProfession from '@/features/professions/components/CardProfession';
import Filter from '@/components/common/Filter';
import useProfessions from '@/store/useProfessions';
import { useShallow } from 'zustand/react/shallow';
import { useLoadProfessions } from '@/hooks/useLoadProfessions';

export function Professions() {

  const {professions} = useProfessions(useShallow((state=>({
    professions: state.professions,
  }))));

  useLoadProfessions();

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProfession, setEditingProfession] = useState<Profession | null>(null);

  const filteredProfessions = professions.filter(prof =>
    prof.names.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = useCallback( (prof: Profession) => {
    setEditingProfession(prof);
    setIsDialogOpen(true);
  }, []);


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

      {filteredProfessions.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {searchTerm ? 'No professions found matching your search.' : 'No professions available.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}