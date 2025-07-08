import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DEFAULT, ELECTIVE, OUTLINE, REQUIRED } from "@/lib/const";
import { deletePensumSupabase } from "@/services/supabase";
import usePensum from "@/store/usePensum";
import { BookOpen, Trash2 } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

interface Props {
  entry: {
    id: string;
    IdClasse: string;
    nameClasse: string | undefined;
    code: string | undefined;
    credits: number | undefined;
    description: string | undefined;
    isElective: boolean;
  };
}

const CardClassBySemester = ({entry}:Props) => {

  const {deletePensum} = usePensum(useShallow((state=>({
    deletePensum: state.deletePensum,
  }))));

  const handleDelete = (id: string) => {
    deletePensumSupabase(id).then((res)=>{
      if(res){
        deletePensum(id);
      }
    });
  };
  
  return (
    <Card key={entry.id} className="border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="font-medium">{entry.nameClasse}</span>
            </div>
            <Badge variant="secondary" className="mt-1">
              {entry.code}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer hover:bg-red-500/10"
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
            <span className="font-medium">{entry.credits}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Type:</span>
            <Badge variant={entry.isElective ? OUTLINE : DEFAULT} className="text-xs">
              {entry.isElective ? ELECTIVE : REQUIRED}
            </Badge>
          </div>
          {entry.description && (
            <p className="text-xs text-muted-foreground mt-2">
              {entry.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardClassBySemester;