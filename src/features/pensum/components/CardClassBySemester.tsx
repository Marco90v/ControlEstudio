import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, Trash2 } from "lucide-react";

interface Props {
  entry: {
    class: {
      code: string;
      id: string;
      name: string;
      credits: number;
      description?: string | undefined;
    };
    semester: number;
    id: string;
    professionId: string;
    classId: string;
    isElective: boolean;
  };
}

const handleDelete = (id: string) => {
  console.log(id);
};

const CardClassBySemester = ({entry}:Props) => {
  return (
    <Card key={entry.id} className="border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="font-medium">{entry.class.name}</span>
            </div>
            <Badge variant="secondary" className="mt-1">
              {entry.class.code}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(entry.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Credits:</span>
            <span className="font-medium">{entry.class.credits}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Type:</span>
            <Badge variant={entry.isElective ? "outline" : "default"} className="text-xs">
              {entry.isElective ? 'Elective' : 'Required'}
            </Badge>
          </div>
          {entry.class.description && (
            <p className="text-xs text-muted-foreground mt-2">
              {entry.class.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardClassBySemester;