import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Class, Profession, Professor, ProfessorAssignment } from "@/types";
import { Trash2 } from "lucide-react";

interface Props {
  assignment: ProfessorAssignment;
  professor: Professor | undefined;
  profession: Profession | undefined;
  classData: Class | undefined;
  setAssignments: React.Dispatch<React.SetStateAction<ProfessorAssignment[]>>;
}

const CardAssignament = ({assignment, professor, profession, classData, setAssignments}:Props) => {

  const handleDelete = (id: string) => {
    console.log('handleDelete', id);
    // setAssignments(assignments.filter(a => a.id !== assignment.id))
    // setProfessors(professors.filter(prof => prof.id !== id));
    // setAssignments(assignments.filter(assign => assign.professorId !== id));
  };

  return (
   <Card key={assignment.id}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
            <div>
              <div className="text-sm text-muted-foreground">Professor</div>
              <div className="font-medium">
                {professor?.firstName} {professor?.lastName}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Class</div>
              <div className="font-medium">
                {classData?.code} - {classData?.name}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Details</div>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs">
                  {profession?.name}
                </Badge>
                <div className="text-sm">
                  Sem {assignment.semester} | {assignment.shift} | Sec {assignment.section}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                // onClick={() => setAssignments(assignments.filter(a => a.id !== assignment.id))}
                onClick={()=>handleDelete(assignment.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardAssignament;