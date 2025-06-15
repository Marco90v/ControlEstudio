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
import { useAuth } from '@/contexts/AuthContext';
import { mockStudents, mockGrades, mockClasses, mockPensum, mockProfessions, mockProfessorAssignments } from '@/data/mockData';
import type { Grade } from '@/types';

export function Grades() {
  const { user } = useAuth();
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
    const studentGrades = getStudentGrades(user.id);
    const gpa = getGPA(user.id);
    
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Grades</h1>
          <p className="text-muted-foreground">View your academic progress and grades</p>
        </div>

        {/* GPA Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Academic Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{gpa}</div>
                <div className="text-sm text-muted-foreground">Overall GPA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {studentGrades.filter(g => g.status === 'Passed').length}
                </div>
                <div className="text-sm text-muted-foreground">Passed Classes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {studentGrades.filter(g => g.status === 'Pending').length}
                </div>
                <div className="text-sm text-muted-foreground">Pending Classes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grades by Semester */}
        <div className="space-y-4">
          {Array.from(new Set(studentGrades.map(g => g.semester))).sort().map(semester => (
            <Card key={semester}>
              <CardHeader>
                <CardTitle>Semester {semester}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {studentGrades.filter(g => g.semester === semester).map((gradeData, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{gradeData.class.name}</div>
                              <Badge variant="secondary" className="text-xs">
                                {gradeData.class.code}
                              </Badge>
                            </div>
                            <Badge
                              variant={
                                gradeData.status === 'Passed' ? 'default' :
                                gradeData.status === 'Failed' ? 'destructive' : 'outline'
                              }
                            >
                              {gradeData.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Grade:</span>
                            <span className="font-bold text-lg">
                              {gradeData.grade !== undefined ? gradeData.grade : 'N/A'}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Credits:</span>
                            <span>{gradeData.class.credits}</span>
                          </div>
                          {gradeData.grade !== undefined && (
                            <Progress 
                              value={gradeData.grade} 
                              className="h-2"
                            />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
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
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => {
          const gpa = getGPA(student.id);
          const studentGrades = getStudentGrades(student.id);
          const passedClasses = studentGrades.filter(g => g.status === 'Passed').length;
          const pendingClasses = studentGrades.filter(g => g.status === 'Pending').length;

          return (
            <Card key={student.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={student.profilePicture} />
                    <AvatarFallback>
                      {student.firstName[0]}{student.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {student.firstName} {student.lastName}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary">
                        Semester {student.currentSemester}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        GPA: {gpa}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-green-600">{passedClasses}</div>
                      <div className="text-muted-foreground">Passed</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-orange-600">{pendingClasses}</div>
                      <div className="text-muted-foreground">Pending</div>
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => setSelectedStudent(student.id)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        View/Edit Grades
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          Grades for {student.firstName} {student.lastName}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        {Array.from(new Set(studentGrades.map(g => g.semester))).sort().map(semester => (
                          <div key={semester}>
                            <h3 className="text-lg font-semibold mb-3">Semester {semester}</h3>
                            <div className="grid gap-3">
                              {studentGrades.filter(g => g.semester === semester).map((gradeData, index) => (
                                <Card key={index}>
                                  <CardContent className="pt-4">
                                    <div className="flex items-center justify-between">
                                      <div className="space-y-1">
                                        <div className="font-medium">{gradeData.class.name}</div>
                                        <Badge variant="secondary" className="text-xs">
                                          {gradeData.class.code} - {gradeData.class.credits} credits
                                        </Badge>
                                      </div>
                                      <div className="flex items-center space-x-3">
                                        {user?.role === 'Admin' || user?.role === 'Professor' ? (
                                          <div className="flex items-center space-x-2">
                                            <Label htmlFor={`grade-${gradeData.class.id}`} className="text-sm">
                                              Grade:
                                            </Label>
                                            <Input
                                              id={`grade-${gradeData.class.id}`}
                                              type="number"
                                              min="0"
                                              max="100"
                                              className="w-20"
                                              value={gradeData.grade || ''}
                                              onChange={(e) => {
                                                const newGrade = parseInt(e.target.value);
                                                if (!isNaN(newGrade)) {
                                                  handleGradeUpdate(student.id, gradeData.class.id, newGrade);
                                                }
                                              }}
                                            />
                                          </div>
                                        ) : (
                                          <div className="text-2xl font-bold">
                                            {gradeData.grade || 'N/A'}
                                          </div>
                                        )}
                                        <Badge
                                          variant={
                                            gradeData.status === 'Passed' ? 'default' :
                                            gradeData.status === 'Failed' ? 'destructive' : 'outline'
                                          }
                                        >
                                          {gradeData.status}
                                        </Badge>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
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