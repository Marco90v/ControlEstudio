import { useState } from 'react';
import CardGPA from '@/features/grades/components/CardGPA';
import CardSemester from '@/features/grades/components/CardSemester';
import Filter from '@/components/common/Filter';
import CardAdmin from '@/features/grades/components/CardAdmin';
import useAuth from '@/store/AuthStore';
import { useShallow } from 'zustand/react/shallow';
import { getAvailableStudents, getGPA, getRoles, getStudentGrades, search } from '@/lib/utils';
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
import { ADMIN, PASSED, PENDING, STUDENT } from '@/lib/const';
import Spinner from '@/components/common/Spinner';

function Grades() {

  const {profile} = useAuth(useShallow((state=>({
    profile: state.profile,
  }))));
  const {professions, loadingProfessions} = useProfessions(useShallow((state=>({
    professions: state.professions,
    loadingProfessions: state.loading,
  }))));
  const {students, loadingStudents} = useStudents(useShallow((state=>({
    students: state.students,
    loadingStudents: state.loading,
  }))));
  const {pensums, loadingPensums} = usePensum(useShallow((state=>({
    pensums: state.pensums,
    loadingPensums: state.loading,
  }))));
  const {grades, loadingGrades} = useGrades(useShallow((state=>({
    grades: state.grades,
    loadingGrades: state.loading,
  }))));
  const {professorAssignments, loadingProfessorAssignments} = useProfessorAssignment(useShallow((state=>({
    professorAssignments: state.professorAssignments,
    loadingProfessorAssignments: state.loading,
  }))));

  useLoadProfessions();
  useLoadStudents();
  useLoadPensums();
  useLoadClasses();
  useLoadGrades();
  useLoadAssignments();

  const [searchTerm, setSearchTerm] = useState('');

  const availableStudents = getAvailableStudents(students, profile, professorAssignments, grades);
  
  const filteredStudents = search(availableStudents, searchTerm, ['firstName', 'lastName', 'email']);

  // Student view - only show their own grades
  if (getRoles(profile?.role) === STUDENT) {
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

  if(loadingStudents || loadingProfessions || loadingPensums || loadingGrades || loadingProfessorAssignments){
    return <Spinner />;
  }

  // Admin and Professor view
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Grades Management</h1>
        <p className="text-muted-foreground">
          {getRoles(profile?.role) === ADMIN ? 'Manage and monitor student grades' : 'Enter grades for your assigned students'}
        </p>
      </div>

      {/* Search Students */}
      <Filter setSearchTerm={setSearchTerm} placeholder="Search students by name or email..." />

      {/* Students List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => {
          const gpa = getGPA(student.id, grades);
          const studentGrades = getStudentGrades(student.id, students, professions, pensums, grades);
          const passedClasses = studentGrades.filter(g => g.status === PASSED).length;
          const pendingClasses = studentGrades.filter(g => g.status === PENDING).length;

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

export default Grades;