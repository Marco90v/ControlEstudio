import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { Student } from '@/types';
import DialogStudent from '@/features/students/components/DialogStudent';
import Filter from '@/components/common/Filter';
import CardStudent from '@/features/students/components/CardStudent';
import { useLoadStudents } from '@/hooks/useLoadStudents';
import useStudents from '@/store/useStudents';
import { useShallow } from 'zustand/react/shallow';

export function Students() {

  const { students } = useStudents(
      useShallow((state) => ({
        students: state.students,
      }))
    );

  useLoadStudents();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  
  const filteredStudents:Student[] = students.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {searchTerm ? 'No students found matching your search.' : 'No students enrolled yet.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}