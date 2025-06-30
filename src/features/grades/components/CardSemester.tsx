import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StudentGrades {
  class: {
      code: string;
      id: string;
      name: string;
      credits: number;
      description?: string | undefined;
  };
  grade: number | undefined;
  status: "Passed" | "Pending" | "Failed";
  semester: number;
}

interface Props{
  semester:number,
  studentGrades:StudentGrades[]
}

const CardSemester = ({semester, studentGrades}:Props) => {
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
                      <div className="font-medium">{gradeData.class.name}</div>
                      <Badge variant="secondary" className="text-xs">
                        {gradeData.class.code}
                      </Badge>
                    </div>
                    <Badge
                      variant={
                        gradeData.status === 'Passed' ? 'default' :
                        gradeData.status === 'Failed' ? 'destructive' : 'outline'
                      }
                    >
                      {gradeData.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Grade:</span>
                    <span className="font-bold text-lg">
                      {gradeData.grade !== undefined ? gradeData.grade : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Credits:</span>
                    <span>{gradeData.class.credits}</span>
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