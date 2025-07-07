import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Grade } from "@/types";
import { Award } from "lucide-react";

// interface StudentGrades {
//   class: {
//       code: string;
//       id: string;
//       names: string;
//       credits: number;
//       description?: string | undefined;
//   };
//   grade: number | undefined;
//   status: "Passed" | "Pending" | "Failed";
//   semester: number;
// }

interface Props {
  studentGrades: Grade[];
  gpa: number;
}

const CardGPA = ({studentGrades, gpa}:Props) => {
  // console.log(studentGrades, gpa);

  // const handleEdit = (student: UserType) => {
  //   setEditingStudent(student);
  //   setFormData({
  //     firstName: student.firstName,
  //     lastName: student.lastName,
  //     email: student.email,
  //     contactNumber: student.contactNumber,
  //     gender: student.gender,
  //     professionId: student.professionId || '',
  //     currentSemester: student.currentSemester || 1,
  //     profilePicture: student.profilePicture || ''
  //   });
  //   setIsDialogOpen(true);
  // };

  // const handleDelete = (id: string) => {
  //   setStudents(students.filter(student => student.id !== id));
  // };

  // const getProfessionName = (professionId?: string) => {
  //   if (!professionId) return 'Not assigned';
  //   const profession = mockProfessions.find(p => p.id === professionId);
  //   return profession?.name || 'Unknown';
  // };

  return (
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
  );
};

export default CardGPA;