import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Professor, ProfessorAssignment } from "@/types";
import { Edit, Trash2, UserCheck } from "lucide-react";

interface Props {
  professor: Professor;
  professorAssignments: ProfessorAssignment[];
  setEditingProfessor: React.Dispatch<React.SetStateAction<Professor | null>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardProfessor = ({professor:prof, professorAssignments,  setEditingProfessor, setIsDialogOpen }: Props) => {
  const handleEdit = (prof: Professor) => {
    setEditingProfessor(prof);
    // setProfessorFormData({
    //   firstName: prof.firstName,
    //   lastName: prof.lastName,
    //   email: prof.email,
    //   contactNumber: prof.contactNumber,
    //   gender: prof.gender,
    //   profilePicture: prof.profilePicture || ''
    // });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    console.log('handleDelete', id);
    // setProfessors(professors.filter(prof => prof.id !== id));
    // setAssignments(assignments.filter(assign => assign.professorId !== id));
  };

  // const getProfessorAssignments = (professorId: string) => {
  //   return assignments.filter(assign => assign.professorId === professorId);
  // };
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
            onClick={() => handleEdit(prof)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
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
              {professorAssignments.length} classes
            </Badge>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
  );
};

export default CardProfessor;