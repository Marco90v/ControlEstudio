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
import Error from '@/components/common/Error';
import { usePageStatus } from '@/hooks/usePageStatus';

function Grades() {
  const auth = useAuth(useShallow(s => ({ profile: s.profile, loading: s.loading, error: s.error })));
  const professions = useProfessions(useShallow(s => ({ professions: s.professions, loading: s.loading, error: s.error })));
  const students = useStudents(useShallow(s => ({ students: s.students, loading: s.loading, error: s.error })));
  const pensums = usePensum(useShallow(s => ({ pensums: s.pensums, loading: s.loading, error: s.error })));
  const grades = useGrades(useShallow(s => ({ grades: s.grades, loading: s.loading, error: s.error })));
  const professorAssignments = useProfessorAssignment(useShallow(s => ({ professorAssignments: s.professorAssignments, loading: s.loading, error: s.error })));

  const states = [auth, professions, students, pensums, grades, professorAssignments];
  const { isLoading, firstError } = usePageStatus(states);

  const [searchTerm, setSearchTerm] = useState('');
  const availableStudents = getAvailableStudents(students.students, auth.profile, professorAssignments.professorAssignments, grades.grades);
  const filteredStudents = search(availableStudents, searchTerm, ['firstName', 'lastName', 'email']);

  useLoadProfessions();
  useLoadStudents();
  useLoadPensums();
  useLoadClasses();
  useLoadGrades();
  useLoadAssignments();

  // Student view - only show their own grades
  if (getRoles(auth.profile?.role) === STUDENT) {
    const studentGrades = getStudentGrades(auth.profile?.userUID.toString(), students.students, professions.professions, pensums.pensums, grades.grades);
    const gpa = getGPA(auth.profile?.userUID.toString(), grades.grades);
    
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

  if (isLoading) return <Spinner />;
  if (firstError) return <Error error={firstError} />;

  // Admin and Professor view
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Grades Management</h1>
        <p className="text-muted-foreground">
          {getRoles(auth.profile?.role) === ADMIN ? 'Manage and monitor student grades' : 'Enter grades for your assigned students'}
        </p>
      </div>

      {/* Search Students */}
      <Filter setSearchTerm={setSearchTerm} placeholder="Search students by name or email..." />

      {/* Students List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => {
          const gpa = getGPA(student.id, grades.grades);
          const studentGrades = getStudentGrades(student.id, students.students, professions.professions, pensums.pensums, grades.grades);
          const passedClasses = studentGrades.filter(g => g.status === PASSED).length;
          const pendingClasses = studentGrades.filter(g => g.status === PENDING).length;

          if(studentGrades.length === 0) return null;
          return (
            <CardAdmin
              key={student.id}
              student={student}
              studentGrades={studentGrades}
              profile={auth.profile}
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