import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { alert, getTotalClassesByProfessor, protectedProfessorsDemo } from "@/lib/utils";
import { deleteProfessorAssignmentSupabase, deleteProfessorSupabase } from "@/services/supabase";
import useProfessorAssignment from "@/store/useProfessorAssignment";
import useProfessors from "@/store/useProfessors";
import type { Professor } from "@/types";
import { Edit, Trash2, UserCheck } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

interface Props {
  professor: Professor;
  setEditingProfessor: React.Dispatch<React.SetStateAction<Professor | null>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardProfessor = ({professor:prof, setEditingProfessor, setIsDialogOpen }: Props) => {

  const {professorAssignments, deleteProfessorAssignment} = useProfessorAssignment(useShallow((state) => ({
    professorAssignments: state.professorAssignments,
    deleteProfessorAssignment: state.deleteProfessorAssignment,
  })));
  const {deleteProfessor} = useProfessors(useShallow((state) => ({
    deleteProfessor: state.deleteProfessor,
  })));

  const handleEdit = (prof: Professor) => {
    setEditingProfessor(prof);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if(protectedProfessorsDemo(id)){
      deleteProfessorSupabase(id).then(res => {
        if(res){
          deleteProfessor(id);
          deleteProfessorAssignmentSupabase(id).then(res => {
            if(res){
              deleteProfessorAssignment(id);
              alert("Professors","Professor deleted successfully");
            }
          });
        }
      });
    }else{
      alert("Professors","This professor is part of the demo, cannot be removed");
    }
  };

  return (
   <Card key={prof.id} className="hover:shadow-md transition-shadow">
    <CardHeader>
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={prof.profilePicture} />
            <AvatarFallback>
              {prof.firstName[0]}{prof.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">
              {prof.firstName} {prof.lastName}
            </CardTitle>
            <Badge variant="secondary" className="mt-1">
              <UserCheck className="h-3 w-3 mr-1" />
              Professor
            </Badge>
          </div>
        </div>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer hover:bg-blue-500/10"
            onClick={() => handleEdit(prof)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer hover:bg-red-500/10"
            onClick={() => handleDelete(prof.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">
          <div>{prof.email}</div>
          <div>{prof.contactNumber}</div>
          <div>Gender: {prof.gender}</div>
        </div>
        <div className="pt-2 border-t border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Assignments:</span>
            <Badge variant="outline">
              {getTotalClassesByProfessor(professorAssignments, prof)} classes
            </Badge>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
  );
};

export default CardProfessor;