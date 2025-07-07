import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Grade } from "@/types";
import { Award } from "lucide-react";

interface Props {
  studentGrades: Grade[];
  gpa: number;
}

const CardGPA = ({studentGrades, gpa}:Props) => {

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