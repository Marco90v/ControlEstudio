import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Search, User, BookOpen, Award } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
// import { useAuth } from '@/contexts/AuthContext';
import { mockStudents, mockGrades, mockClasses, mockPensum, mockProfessions, mockProfessorAssignments } from '@/data/mockData';
import type { Grade } from '@/types';
import CardGPA from '@/features/grades/components/CardGPA';
import CardSemester from '@/features/grades/components/CardSemester';
import Filter from '@/components/common/Filter';
import CardAdmin from '@/features/grades/components/CardAdmin';

const user = {
  id: '1',
  role: 'Admin',
  name: 'Admin',
  email: 'admin@admin.com',
  image: 'https://i.pravatar.cc/300?img=1',
  firstName: 'Admin',
  lastName: 'Admin',
  profilePicture: 'https://i.pravatar.cc/300?img=1',
  currentSemester: 1,
  professionId: 1,
  gender: 'Male',
  contactNumber: '+1-555-0101',
};

export function Grades() {
  // const { user } = useAuth();
  const [grades, setGrades] = useState<Grade[]>(mockGrades);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);

  // Filter students based on user role
  const getAvailableStudents = () => {
    if (user?.role === 'Admin') {
      return mockStudents;
    } else if (user?.role === 'Professor') {
      // Professor can only see students from their assigned classes
      const professorAssignments = mockProfessorAssignments.filter(a => a.professorId === user.id);
      const assignedClassIds = professorAssignments.map(a => a.classId);
      
      return mockStudents.filter(student => {
        const studentGrades = grades.filter(g => g.studentId === student.id);
        return studentGrades.some(grade => assignedClassIds.includes(grade.classId));
      });
    }
    return [];
  };

  const availableStudents = getAvailableStudents();
  
  const filteredStudents = availableStudents.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get student grades for current user
  const getStudentGrades = (studentId: string) => {
    const student = mockStudents.find(s => s.id === studentId);
    if (!student) return [];

    const studentProfession = mockProfessions.find(p => p.id === student.professionId);
    if (!studentProfession) return [];

    // Get all classes for current semester
    const currentSemester = student.currentSemester || 1;
    const semesterClasses = mockPensum
      .filter(p => p.professionId === student.professionId && p.semester <= currentSemester)
      .map(p => {
        const classData = mockClasses.find(c => c.id === p.classId);
        const grade = grades.find(g => g.studentId === studentId && g.classId === p.classId);
        return {
          class: classData!,
          grade: grade?.grade,
          status: grade?.status || 'Pending',
          semester: p.semester
        };
      });

    return semesterClasses;
  };

  const handleGradeUpdate = (studentId: string, classId: string, newGrade: number) => {
    const existingGrade = grades.find(g => g.studentId === studentId && g.classId === classId);
    const status = newGrade >= 70 ? 'Passed' : 'Failed';

    if (existingGrade) {
      setGrades(grades.map(g => 
        g.id === existingGrade.id 
          ? { ...g, grade: newGrade, status }
          : g
      ));
    } else {
      const newGradeEntry: Grade = {
        id: (grades.length + 1).toString(),
        studentId,
        classId,
        semester: 1, // You might want to determine this dynamically
        grade: newGrade,
        status
      };
      setGrades([...grades, newGradeEntry]);
    }
  };

  const getGPA = (studentId: string) => {
    const studentGrades = grades.filter(g => g.studentId === studentId && g.grade !== undefined);
    if (studentGrades.length === 0) return 0;
    
    const totalGrades = studentGrades.reduce((sum, g) => sum + (g.grade || 0), 0);
    return Math.round((totalGrades / studentGrades.length) * 100) / 100;
  };

  // Student view - only show their own grades
  if (user?.role === 'Student') {
  // if (true) {
    const studentGrades = getStudentGrades(user.id);
    const gpa = getGPA(user.id);
    
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Grades</h1>
          <p className="text-muted-foreground">View your academic progress and grades</p>
        </div>

        {/* GPA Card */}
        <CardGPA studentGrades={studentGrades} gpa={gpa} />

        {/* Grades by Semester */}
        <div className="space-y-4">
          {Array.from(new Set(studentGrades.map(g => g.semester))).sort().map(semester => (
            <CardSemester semester={semester} studentGrades={studentGrades} />
          ))}
        </div>
      </div>
    );
  }

  // Admin and Professor view
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Grades Management</h1>
        <p className="text-muted-foreground">
          {user?.role === 'Admin' ? 'Manage and monitor student grades' : 'Enter grades for your assigned students'}
        </p>
      </div>

      {/* Search Students */}
      <Filter setSearchTerm={setSearchTerm} placeholder="Search students by name or email..." />

      {/* Students List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => {
          const gpa = getGPA(student.id);
          const studentGrades = getStudentGrades(student.id);
          const passedClasses = studentGrades.filter(g => g.status === 'Passed').length;
          const pendingClasses = studentGrades.filter(g => g.status === 'Pending').length;

          return (
            <CardAdmin
              key={student.id}
              student={student}
              setSelectedStudent={setSelectedStudent}
              studentGrades={studentGrades}
              user={user}
              passedClasses={passedClasses}
              pendingClasses={pendingClasses}
              gpa={gpa}
              handleGradeUpdate={handleGradeUpdate}
            />
          );
        })}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {searchTerm ? 'No students found matching your search.' : 'No students available for grade management.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}