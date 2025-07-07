import { Card, CardContent } from "@/components/ui/card";
import type { Class, Profession, ProfessorAssignment, Student } from "@/types";

interface Props {
  data: Class[] | Student[] | Profession[] | ProfessorAssignment[];
  searchTerm: string;
  textTrue: string;
  textFalse: string;
}

const NoData = ({data, searchTerm, textTrue, textFalse}:Props) => {
  if (data.length > 0) return null;
  return (
    data.length === 0 && (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">
            {searchTerm ? textTrue : textFalse}
          </p>
        </CardContent>
      </Card>
    )
  );
};
export default NoData;