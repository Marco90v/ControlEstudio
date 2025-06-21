import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Profession } from "@/types"
import { Edit, GraduationCap, Trash2 } from "lucide-react"
import { memo } from "react"

interface Props {
  prof: Profession
  handleEdit: (prof: Profession) => void
  handleDelete: (id: string) => void
}

const cardProfession = memo (({prof, handleEdit, handleDelete}:Props) => {
  console.log(prof);
  return (
    <Card key={prof.id} className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{prof.name}</CardTitle>
              <Badge variant="secondary" className="mt-1">
                {prof.code}
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
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-medium">{prof.totalSemesters} semesters</span>
          </div>
          {prof.description && (
            <p className="text-sm text-muted-foreground">
              {prof.description}
            </p>
          )}
          <div className="pt-2 border-t border-border">
            <div className="text-xs text-muted-foreground">
              Estimated completion: {Math.ceil(prof.totalSemesters / 2)} years
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
});

export default cardProfession