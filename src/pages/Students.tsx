import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
// import { Plus, Edit, Trash2, Search, User, GraduationCap } from 'lucide-react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockStudents, mockProfessions } from '@/data/mockData';
import type { Student, User as UserType } from '@/types';
import DialogStudent from '@/features/students/components/DialogStudent';
import Filter from '@/components/common/Filter';
import CardStudent from '@/features/students/components/CardStudent';

export function Students() {
  const [students, setStudents] = useState<Student[]>(mockStudents as Student[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    professionId: '',
    currentSemester: 1,
    profilePicture: ''
  });

  const filteredStudents:Student[] = students.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingStudent) {
      setStudents(students.map(student => 
        student.id === editingStudent.id 
          ? { ...editingStudent, ...formData, role: 'Student' as const }
          : student
      ));
    } else {
      const newStudent: UserType = {
        id: (students.length + 10).toString(),
        ...formData,
        role: 'Student'
      };
      setStudents([...students, newStudent]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      gender: 'Male',
      professionId: '',
      currentSemester: 1,
      profilePicture: ''
    });
    setEditingStudent(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (student: UserType) => {
    setEditingStudent(student);
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      contactNumber: student.contactNumber,
      gender: student.gender,
      professionId: student.professionId || '',
      currentSemester: student.currentSemester || 1,
      profilePicture: student.profilePicture || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const getProfessionName = (professionId?: string) => {
    if (!professionId) return 'Not assigned';
    const profession = mockProfessions.find(p => p.id === professionId);
    return profession?.name || 'Unknown';
  };

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