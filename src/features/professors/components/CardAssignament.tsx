import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { alert } from "@/lib/utils";
import { deleteAssignmentSupabase } from "@/services/supabase";
import useClasses from "@/store/useClasses";
import useProfessions from "@/store/useProfessions";
import useProfessorAssignment from "@/store/useProfessorAssignment";
import useProfessors from "@/store/useProfessors";
import type { ProfessorAssignment } from "@/types";
import { Trash2 } from "lucide-react";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

interface Props {
  assignment: ProfessorAssignment;
}

const CardAssignament = ({assignment}:Props) => {

  const {classes} = useClasses(useShallow((state) => ({
    classes: state.classes,
  })));
  const {professions} = useProfessions(useShallow((state) => ({
    professions: state.professions,
  })));
  const {professors} = useProfessors(useShallow((state) => ({
    professors: state.professors,
  })));
  const {deleteAssignment} = useProfessorAssignment(useShallow((state) => ({
    deleteAssignment: state.deleteAssignment,
  })));


  const cls = useCallback(() => {
    return classes.find(c => c.id === assignment.classId);
  }, [assignment.classId, classes]);

  const pfss = useCallback(() => {
    return professions.find(p => p.id === assignment.professionId);
  }, [assignment.professionId, professions]);

  const pf = useCallback(() => {
    return professors.find(p => p.id === assignment.professorId);
  }, [assignment.professorId, professors]);

  const handleDelete = (id: string) => {
    deleteAssignmentSupabase(id).then(res => {
      if(res){
        deleteAssignment(id);
        alert("Professors","Teaching assignment deleted successfully");
      }
    });
  };

  return (
   <Card key={assignment.id}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
            <div>
              <div className="text-sm text-muted-foreground">Professor</div>
              <div className="font-medium">
                {pf()?.firstName} {pf()?.lastName}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Class</div>
              <div className="font-medium">
                {cls()?.code} - {cls()?.names}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Details</div>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs">
                  {pfss()?.names}
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
                className="cursor-pointer hover:bg-red-500/10"
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