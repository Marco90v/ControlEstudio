import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Class } from "@/types";
import { Edit, Trash2 } from "lucide-react";
import { memo } from "react";

interface Porps {
  cls: Class;
  handleEdit: (cls: Class) => void;
  handleDelete: (id: string) => void;
}

const CardClass = memo(({cls, handleEdit, handleDelete}: Porps) => {
  console.log(cls);
  return (
    <Card key={cls.id} className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{cls.name}</CardTitle>
            <Badge variant="secondary" className="mt-1">
              {cls.code}
            </Badge>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleEdit(cls)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(cls.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Credits:</span>
            <span className="font-medium">{cls.credits}</span>
          </div>
          {cls.description && (
            <p className="text-sm text-muted-foreground">
              {cls.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

export default CardClass;