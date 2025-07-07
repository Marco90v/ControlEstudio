import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { protectedStudentsDemo } from "@/lib/utils";
import { deleteStudentSupabase } from "@/services/supabase";
import useProfessions from "@/store/useProfessions";
import useStudents from "@/store/useStudents";
import type { Student } from "@/types";
import { Edit, GraduationCap, Trash2, User } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

interface Props {
  student: Student;
  setEditingStudent: React.Dispatch<React.SetStateAction<Student | null>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardStudent = ({student, setEditingStudent, setIsDialogOpen}:Props) => {

  const {professions} = useProfessions(useShallow((state=>({
    professions: state.professions,
  }))));
  const {deleteStudent} = useStudents(useShallow((state=>({
    deleteStudent: state.deleteStudent,
  }))));

  const handleDelete = (id: string) => {
    if(protectedStudentsDemo(id)){
      deleteStudentSupabase(id).then(res => {
        if(res){
          deleteStudent(id);
        }
      });
    }else{
      console.log("This student is part of the demo, cannot be removed");
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setIsDialogOpen(true);
  };

  const getProfessionName = (professionId?: string) => {
    if (!professionId) return 'Not assigned';
    const profession = professions.find(p => p.id === professionId);
    return profession?.names || 'Unknown';
  };

  return (
   <Card key={student.id} className="hover:shadow-md transition-shadow">
    <CardHeader>
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={student.profilePicture} />
            <AvatarFallback>
              {student.firstName[0]}{student.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">
              {student.firstName} {student.lastName}
            </CardTitle>
            <Badge variant="secondary" className="mt-1">
              <User className="h-3 w-3 mr-1" />
              Student
            </Badge>
          </div>
        </div>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer hover:bg-blue-500/10"
            onClick={() => handleEdit(student)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer hover:bg-red-500/10"
            onClick={() => handleDelete(student.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="text-sm text-muted-foreground">
          <div>{student.email}</div>
          <div>{student.contactNumber}</div>
          <div>Gender: {student.gender}</div>
        </div>
        
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Profession:</span>
            <div className="flex items-center space-x-1">
              <GraduationCap className="h-3 w-3" />
              <span className="font-medium text-xs">
                {getProfessionName(student.professionId)}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Current Semester:</span>
            <Badge variant="outline" className="text-xs">
              Semester {student.currentSemester || 1}
            </Badge>
          </div>
        </div>
        
        <div className="pt-2 border-t border-border">
          <div className="text-xs text-muted-foreground">
            Student ID: {student.id.padStart(6, '0')}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
  );
};

export default CardStudent;