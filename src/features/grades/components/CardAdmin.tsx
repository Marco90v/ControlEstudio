// components/CardAdmin.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { gradeSchema } from "../schema";
// import DialogGrade from "./DialogGrade";
import type { Grade, Student } from "@/types";
import { getRoles } from "@/lib/utils";
import useClasses from "@/store/useClasses";
import { useShallow } from "zustand/react/shallow";
import { updateAllGradesSupabase } from "@/services/supabase";
import useGrades from "@/store/useGrades";

const formSchema = z.object({
  grades: z.array(gradeSchema)
});

type FormType = z.infer<typeof formSchema>;

// type StudentGrades = z.infer<typeof gradeSchema>;

// interface studentGrades {
//     class: {
//         code: string;
//         id: string;
//         names: string;
//         credits: number;
//         description?: string | undefined;
//     };
//     grade: number | undefined;
//     status: "Passed" | "Pending" | "Failed";
//     semester: number;
// }
interface Profile {
    id: number;
    names: string;
    lastNames: string;
    sex: string;
    email: string;
    phone: number;
    photo: string;
    role: number;
    nameRole: string;
    userUID: string;
}

interface Props {
  student: Student;
  studentGrades: Grade[];
  profile: Profile | null | undefined;
  passedClasses: number;
  pendingClasses: number;
  gpa: number;
}

const CardAdmin = ({ student, studentGrades, profile, passedClasses, pendingClasses, gpa }: Props) => {
  
  const {classes} = useClasses(useShallow((state=>({
    classes: state.classes,
  }))));

  const {setGrades} = useGrades(useShallow((state=>({
    setGrades: state.setGrades,
  }))));

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grades: studentGrades
    }
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "grades"
  });

  const getClassName = (classId: string) => {
    const classData = classes.find(c => c.id === classId);
    return classData?.names || 'N/A';
  };

  const getClassCode = (classId: string) => {
    const classData = classes.find(c => c.id === classId);
    return classData?.code || 'N/A';
  };

  const getClassCredits = (classId: string) => {
    const classData = classes.find(c => c.id === classId);
    return classData?.credits || 0;
  };

  const onSubmit = (data: FormType) => {
    const newData = data.grades.map(g=>{
      if(g.grade === undefined) return g;
      return g.grade >= 70 ? {...g, status: 'Passed'} : {...g, status: 'Failed'};
    })
    updateAllGradesSupabase(newData as Grade[]).then((res)=>{
      if(res){
        setGrades(newData as Grade[]);
        console.log("Grade updated successfully");
      }
    });
  };

  const handlerSave = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)();
  };

  return (
    <Card key={student.id} className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={student.profilePicture} />
            <AvatarFallback>
              {student.firstName[0]}
              {student.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">
              {student.firstName} {student.lastName}
            </CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="secondary">Semester {student.currentSemester}</Badge>
              <Badge variant="outline" className="text-xs">GPA: {gpa}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-green-600">{passedClasses}</div>
              <div className="text-muted-foreground">Passed</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-orange-600">{pendingClasses}</div>
              <div className="text-muted-foreground">Pending</div>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="w-full"
                variant="outline"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                View/Edit Grades
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  Grades for {student.firstName} {student.lastName}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handlerSave} className="space-y-4">
                {[...new Set(fields.map((f) => f.semester))].sort().map((semester) => (
                  <div key={semester}>
                    <h3 className="text-lg font-semibold mb-3">Semester {semester}</h3>
                    <div className="grid gap-3">
                      {fields.filter(f => f.semester === semester).map((field) => {
                        const globalIndex = fields.findIndex(f => f.id === field.id);
                        return (
                          <Card key={field.id}>
                            <CardContent className="pt-4">
                              <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                  {/* <div className="font-medium">{field.class.name}</div> */}
                                  <div className="font-medium">{getClassName(field.classId)}</div>
                                  <Badge variant="secondary" className="text-xs">
                                    {/* {field.class.code} - {field.class.credits} credits */}
                                    {getClassCode(field.classId)} - {getClassCredits(field.classId)} credits
                                  </Badge>
                                </div>
                                <div className="flex items-center space-x-3">
                                  {(getRoles(profile?.role) === 'Admin' || getRoles(profile?.role) === 'Professor') ? ( 
                                    <div className="flex items-center space-x-2">
                                      <Label htmlFor={`grades.${globalIndex}.grade`} className="text-sm">Grade:</Label>
                                      <Controller
                                        control={form.control}
                                        name={`grades.${globalIndex}.grade` as const}
                                        render={({ field }) => (
                                          <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            className="w-20"
                                            {...field}
                                            onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                                          />
                                        )}
                                      />
                                    </div>
                                  ) : (
                                    <div className="text-2xl font-bold">
                                      {field.grade ?? 'N/A'}
                                    </div>
                                  )}
                                  <Badge
                                    variant={
                                      field.status === 'Passed'
                                        ? 'default'
                                        : field.status === 'Failed'
                                        ? 'destructive'
                                        : 'outline'
                                    }
                                  >
                                    {field.status}
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="flex justify-end">
                  <Button type="submit">Guardar cambios</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardAdmin;
