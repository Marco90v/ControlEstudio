import { useState } from 'react';
import type { Student } from '@/types';
import DialogStudent from '@/features/students/components/DialogStudent';
import Filter from '@/components/common/Filter';
import CardStudent from '@/features/students/components/CardStudent';
import { useLoadStudents } from '@/hooks/useLoadStudents';
import useStudents from '@/store/useStudents';
import { useShallow } from 'zustand/react/shallow';
import NoData from '@/features/classes/components/NoData';
import { search } from '@/lib/utils';
import Spinner from '@/components/common/Spinner';
import { usePageStatus } from '@/hooks/usePageStatus';
import Error from '@/components/common/Error';

function Students() {
  const students = useStudents(useShallow((s) => ({ students: s.students, loading: s.loading, error: s.error })));
  const states = [students];
  const { isLoading, firstError } = usePageStatus(states);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const filteredStudents = search(students.students, searchTerm, ['firstName', 'lastName', 'email']);

  useLoadStudents();  

  if (isLoading) return <Spinner />;
  if (firstError) return <Error error={firstError} />;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground">Manage student enrollment and academic information</p>
        </div>
        
        <DialogStudent
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          editingStudent={editingStudent}
          setEditingStudent={setEditingStudent}
        />
      </div>

      {/* Search */}
      <Filter setSearchTerm={setSearchTerm} placeholder="Search students by name or email..." />

      {/* Students Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => (
          <CardStudent key={student.id} student={student} setEditingStudent={setEditingStudent} setIsDialogOpen={setIsDialogOpen} />
        ))}
      </div>

      <NoData data={filteredStudents} searchTerm={searchTerm} textTrue='No students found matching your search.' textFalse='No students enrolled yet.' />
      
    </div>
  );
}

export default Students;