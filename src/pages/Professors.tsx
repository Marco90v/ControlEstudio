import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Professor } from '@/types';
import DialogAssignment from '@/features/professors/components/DialogAssignment';
import DialogProfessor from '@/features/professors/components/DialogProfessor';
import CardProfessor from '@/features/professors/components/CardProfessor';
import Filter from '@/components/common/Filter';
import CardAssignament from '@/features/professors/components/CardAssignament';
import useProfessors from '@/store/useProfessors';
import { useShallow } from 'zustand/react/shallow';
import { useLoadProfessors } from '@/hooks/useLoadProfessors';
import { useLoadAssignments } from '@/hooks/useLoadAssignments';
import useProfessorAssignment from '@/store/useProfessorAssignment';
import NoData from '@/features/classes/components/NoData';
import { search } from '@/lib/utils';

export function Professors() {

  const {professors} = useProfessors(useShallow((state=>({
    professors: state.professors,
  }))));

  const {professorAssignments} = useProfessorAssignment(useShallow((state=>({
    professorAssignments: state.professorAssignments,
  }))));

  useLoadProfessors();
  useLoadAssignments();

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(null);

  const filteredProfessors = search(professors, searchTerm, ['firstName', 'lastName', 'email']);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Professors</h1>
          <p className="text-muted-foreground">Manage university professors and their teaching assignments</p>
        </div>
        
        <div className="flex space-x-2">
          <DialogAssignment isAssignmentDialogOpen={isAssignmentDialogOpen} setIsAssignmentDialogOpen={setIsAssignmentDialogOpen} />

          <DialogProfessor isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} editingProfessor={editingProfessor} setEditingProfessor={setEditingProfessor} />
        </div>
      </div>

      <Tabs defaultValue="professors" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="professors">Professors</TabsTrigger>
          <TabsTrigger value="assignments">Teaching Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="professors" className="space-y-4">
          {/* Search */}
          <Filter setSearchTerm={setSearchTerm} placeholder="Search professors by name or email..." />

          {/* Professors Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProfessors.map((prof) => {
              return (
                <CardProfessor
                  key={prof.id}
                  professor={prof}
                  setEditingProfessor={setEditingProfessor}
                  setIsDialogOpen={setIsDialogOpen}
                />
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <div className="grid gap-4">
            {professorAssignments.map((assignment) => {              
              return (
                <CardAssignament
                  key={assignment.id}
                  assignment={assignment}
                />
              );
            })}
          </div>

          <NoData data={professorAssignments} searchTerm={searchTerm} textTrue='No teaching assignments yet.' textFalse='No teaching assignments yet.' />
          
        </TabsContent>
      </Tabs>
    </div>
  );
}