import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { BookOpen } from 'lucide-react';
// import { mockPensum, mockProfessions, mockClasses } from '@/data/mockData';
import type { PensumEntry } from '@/types';
import PensumDialog from '@/features/pensum/components/PensumDialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { pensumSchema } from '@/features/pensum/schema';
import { Form } from '@/components/ui/form';
import ProfessionSelector from '@/features/pensum/components/ProfessionSelector';
import TabsSemeter from '@/features/pensum/components/TabsSemeter';
import CardClassBySemester from '@/features/pensum/components/CardClassBySemester';
import usePensum from '@/store/usePensum';
import { useShallow } from 'zustand/react/shallow';
import useClasses from '@/store/useClasses';
import { useLoadClasses } from '@/hooks/useLoadClasses';
import { getTotalCredits, transformPensum } from '@/lib/utils';
import { useLoadPensums } from '@/hooks/useLoadPensums';

// const initinalValues: PensumEntry = {
//   id: '',
//   professionId: '1',
//   classId: '',
//   semester: 0,
//   isElective: false
// };

export function Pensum() {

  const {pensums} = usePensum(useShallow((state=>({
    pensums: state.pensums,
    setPensums: state.setPensums,
  }))));
  const {classes} = useClasses(useShallow((state=>({ 
    classes: state.classes,
  }))));

  useLoadClasses();
  useLoadPensums();

  const formPensum = useForm<PensumEntry>({
    resolver: zodResolver(pensumSchema),
    // defaultValues: initinalValues,
  });

  const IdProfession = formPensum.watch('IdProfession');
  // console.log(IdProfession);


  // const [pensum, setPensum] = useState<PensumEntry[]>(mockPensum);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [selectedProfession, setSelectedProfession] = useState<string>('1');
  // const [formData, setFormData] = useState({
  //   classId: '',
  //   semester: 1,
  //   isElective: false
  // });

  // const selectedProfessionData = mockProfessions.find(p => p.id === selectedProfession);
  // const professionPensum = pensum.filter(p => p.professionId === selectedProfession);
  // const selectedProfessionData = mockProfessions.find(p => p.id === IdProfession);
  // const professionPensum = pensums.filter(p => p.IdProfession === IdProfession);

  // Group classes by semester
  // const semesterData = Array.from({ length: selectedProfessionData?.totalSemesters || 8 }, (_, i) => {
  //   const semester = i + 1;
  //   const semesterClasses = professionPensum.filter(p => p.IdSemester === semester);
  //   return {
  //     semester,
  //     classes: semesterClasses.map(p => ({
  //       ...p,
  //       class: mockClasses.find(c => c.id === p.IdClasse)!
  //     }))
  //   };
  // });

  const pensum = pensums.filter(p => p.IdProfession === IdProfession).map(c=>{
    return {
      ...c,
      nameClasse: classes.find(cls => cls.id === c.IdClasse)?.names,
      code: classes.find(cls => cls.id === c.IdClasse)?.code,
      credits: classes.find(cls => cls.id === c.IdClasse)?.credits,
      description: classes.find(cls => cls.id === c.IdClasse)?.description,
    }
  });
  // console.log(temp);
  const NewPensum = transformPensum(pensum);
  // console.log(temp2);

  // const rest = Object.groupBy(temp, 'IdSemester');
  // console.log(temp);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   const newPensumEntry: PensumEntry = {
  //     id: (pensum.length + 1).toString(),
  //     professionId: selectedProfession,
  //     ...formData
  //   };
    
  //   setPensum([...pensum, newPensumEntry]);
  //   resetForm();
  // };

  // const resetForm = () => {
  //   setFormData({ classId: '', semester: 1, isElective: false });
  //   setIsDialogOpen(false);
  // };

  // const handleDelete = (id: string) => {
  //   setPensum(pensum.filter(p => p.id !== id));
  // };

  // const getTotalCredits = (sem: any) => {
  //   // console.log(sem);
  //   const total = sem.classes.reduce((total, p) => {
  //     const cls = mockClasses.find(c => c.id === p.IdClasse);
  //     return total + (cls?.credits || 0);
  //   }, 0);
  //   return total;
  //   // return professionPensum
  //   //   .filter(p => p.semester === semester)
  //   //   .reduce((total, p) => {
  //   //     const cls = mockClasses.find(c => c.id === p.classId);
  //   //     return total + (cls?.credits || 0);
  //   //   }, 0);
  //   // return 0;
  // };

  // const availableClasses = mockClasses.filter(cls => 
  //   !professionPensum.some(p => p.classId === cls.id)
  // );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Academic Curriculum (Pensum)</h1>
          <p className="text-muted-foreground">Manage semester-based class assignments for each profession</p>
        </div>
        
        <Form {...formPensum}>
          <PensumDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        </Form>
      </div>

      {/* Profession Selector */}
      <Form {...formPensum}>
        <ProfessionSelector />
      </Form>

      {/* Curriculum Tabs */}
      <Tabs defaultValue="1" className="w-full">
        <TabsSemeter IdProfession={IdProfession} />

        {NewPensum && NewPensum.semester.map((sem) => (
          <TabsContent key={sem.IdSemester} value={sem.IdSemester.toString()}>
            <Card className='mt-6'>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Semester {sem.IdSemester}</CardTitle>
                  <Badge variant="outline">
                    {getTotalCredits(sem.classes)} Total Credits
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {sem.classes.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {sem.classes.map((entry) => (
                      <CardClassBySemester key={entry.IdClasse} entry={entry} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No classes assigned to this semester yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}