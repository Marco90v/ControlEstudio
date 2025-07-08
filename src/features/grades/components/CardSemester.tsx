import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DEFAULT, DESTRUCTIVE, FAILED, NA, OUTLINE, PASSED } from "@/lib/const";
import useClasses from "@/store/useClasses";
import type { Grade } from "@/types";
import { useShallow } from "zustand/react/shallow";

interface Props{
  semester:number,
  studentGrades:Grade[]
}

const CardSemester = ({semester, studentGrades}:Props) => {

  const {classes} = useClasses(useShallow((state=>({
    classes: state.classes,
  }))));

  const getClasseName = (classId: string) => {
    const classData = classes.find(c => c.id === classId);
    return classData?.names || NA;
  };

  const getClasseCode = (classId: string) => {
    const classData = classes.find(c => c.id === classId);
    return classData?.code || NA;
  };

  const getClasseCredits = (classId: string) => {
    const classData = classes.find(c => c.id === classId);
    return classData?.credits || 0;
  };

  return (
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
                      <div className="font-medium">{getClasseName(gradeData.classId)}</div>
                      <Badge variant="secondary" className="text-xs">
                        {getClasseCode(gradeData.classId)}
                      </Badge>
                    </div>
                    <Badge
                      variant={
                        gradeData.status === PASSED ? DEFAULT :
                        gradeData.status === FAILED ? DESTRUCTIVE : OUTLINE
                      }
                    >
                      {gradeData.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Grade:</span>
                    <span className="font-bold text-lg">
                      {gradeData.grade !== undefined ? gradeData.grade : NA}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Credits:</span>
                    <span>{getClasseCredits(gradeData.classId)}</span>
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
  );
};

export default CardSemester;