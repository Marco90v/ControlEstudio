import { useState } from 'react';
import CardGPA from '@/features/grades/components/CardGPA';
import CardSemester from '@/features/grades/components/CardSemester';
import Filter from '@/components/common/Filter';
import CardAdmin from '@/features/grades/components/CardAdmin';
import useAuth from '@/store/AuthStore';
import { useShallow } from 'zustand/react/shallow';
import { getGPA, getRoles, getStudentGrades, search } from '@/lib/utils';
import useProfessions from '@/store/useProfessions';
import useStudents from '@/store/useStudents';
import usePensum from '@/store/usePensum';
import useGrades from '@/store/useGrades';
import { useLoadGrades } from '@/hooks/useLoadGrades';
import useProfessorAssignment from '@/store/useProfessorAssignment';
import { useLoadStudents } from '@/hooks/useLoadStudents';
import { useLoadProfessions } from '@/hooks/useLoadProfessions';
import { useLoadPensums } from '@/hooks/useLoadPensums';
import { useLoadClasses } from '@/hooks/useLoadClasses';
import { useLoadAssignments } from '@/hooks/useLoadAssignments';
import NoData from '@/features/classes/components/NoData';

export function Grades() {

  const {profile} = useAuth(useShallow((state=>({
    profile: state.profile,
  }))));
  const {professions} = useProfessions(useShallow((state=>({
    professions: state.professions,
  }))));
  const {students} = useStudents(useShallow((state=>({
    students: state.students,
  }))));
  const {pensums} = usePensum(useShallow((state=>({
    pensums: state.pensums,
  }))));
  const {grades} = useGrades(useShallow((state=>({
    grades: state.grades,
  }))));
  const {professorAssignments} = useProfessorAssignment(useShallow((state=>({
    professorAssignments: state.professorAssignments,
  }))));

  useLoadProfessions();
  useLoadStudents();
  useLoadPensums();
  useLoadClasses();
  useLoadGrades();
  useLoadAssignments();

  const [searchTerm, setSearchTerm] = useState('');

  // Filter students based on user role
  const getAvailableStudents = () => {
    if (getRoles(profile?.role) === 'Admin') {
      return students;
    } else if (getRoles(profile?.role) === 'Professor') {
      // Professor can only see students from their assigned classes
      const newProfessorAssignments = professorAssignments.filter(a => a.professorId === profile?.id.toString());
      const assignedClassIds = newProfessorAssignments.map(a => a.classId);
      
      return students.filter(student => {
        const studentGrades = grades.filter(g => g.studentId === student.id);
        return studentGrades.some(grade => assignedClassIds.includes(grade.classId));
      });
    }
    return [];
  };

  const availableStudents = getAvailableStudents();
  
  const filteredStudents = search(availableStudents, searchTerm, ['firstName', 'lastName', 'email']);

  // Student view - only show their own grades
  if (getRoles(profile?.role) === 'Student') {
    const studentGrades = getStudentGrades(profile?.userUID.toString(), students, professions, pensums, grades);
    const gpa = getGPA(profile?.userUID.toString(), grades);
    
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
          {getRoles(profile?.role) === 'Admin' ? 'Manage and monitor student grades' : 'Enter grades for your assigned students'}
        </p>
      </div>

      {/* Search Students */}
      <Filter setSearchTerm={setSearchTerm} placeholder="Search students by name or email..." />

      {/* Students List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => {
          const gpa = getGPA(student.id, grades);
          const studentGrades = getStudentGrades(student.id, students, professions, pensums, grades);
          const passedClasses = studentGrades.filter(g => g.status === 'Passed').length;
          const pendingClasses = studentGrades.filter(g => g.status === 'Pending').length;

          if(studentGrades.length === 0) return null;
          return (
            <CardAdmin
              key={student.id}
              student={student}
              studentGrades={studentGrades}
              profile={profile}
              passedClasses={passedClasses}
              pendingClasses={pendingClasses}
              gpa={gpa}
            />
          );
        })}
      </div>

      <NoData data={filteredStudents} searchTerm={searchTerm} textTrue='No students found matching your search.' textFalse='No students available for grade management.' />      
    </div>
  );
}