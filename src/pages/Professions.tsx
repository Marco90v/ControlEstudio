import { useCallback, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { mockProfessions } from '@/data/mockData';
import type { Profession } from '@/types';
import ProfessionDialog from '@/features/professions/components/ProfessionDialog';
import CardProfession from '@/features/professions/components/CardProfession';
import Filter from '@/components/common/Filter';

export function Professions() {
  const [professions, setProfessions] = useState<Profession[]>(mockProfessions);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProfession, setEditingProfession] = useState<Profession | null>(null);
  // const [formData, setFormData] = useState({
  //   name: '',
  //   code: '',
  //   totalSemesters: 8,
  //   description: ''
  // });

  const filteredProfessions = professions.filter(prof =>
    prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   if (editingProfession) {
  //     setProfessions(professions.map(prof => 
  //       prof.id === editingProfession.id 
  //         ? { ...editingProfession, ...formData }
  //         : prof
  //     ));
  //   } else {
  //     const newProfession: Profession = {
  //       id: (professions.length + 1).toString(),
  //       ...formData
  //     };
  //     setProfessions([...professions, newProfession]);
  //   }
    
  //   resetForm();
  // };

  // const resetForm = () => {
  //   setFormData({ name: '', code: '', totalSemesters: 8, description: '' });
  //   setEditingProfession(null);
  //   setIsDialogOpen(false);
  // };

  const handleEdit = useCallback( (prof: Profession) => {
    setEditingProfession(prof);
    // setFormData({
    //   name: prof.name,
    //   code: prof.code,
    //   totalSemesters: prof.totalSemesters,
    //   description: prof.description || ''
    // });
    setIsDialogOpen(true);
  }, []);

  const handleDelete = useCallback( (id: string) => {
    setProfessions(professions.filter(prof => prof.id !== id));
  }, [professions]);

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
          <CardProfession key={prof.id} prof={prof} handleEdit={handleEdit} handleDelete={handleDelete} />
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