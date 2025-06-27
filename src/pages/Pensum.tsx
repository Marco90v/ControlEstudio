import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { BookOpen } from 'lucide-react';
import { mockPensum, mockProfessions, mockClasses } from '@/data/mockData';
import type { PensumEntry } from '@/types';
import PensumDialog from '@/features/classes/pensum/components/PensumDialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { pensumSchema } from '@/features/classes/pensum/schema';
import { Form } from '@/components/ui/form';
import ProfessionSelector from '@/features/classes/pensum/components/ProfessionSelector';
import TabsSemeter from '@/features/classes/pensum/components/TabsSemeter';
import CardClassBySemester from '@/features/classes/pensum/components/CardClassBySemester';

const initinalValues: PensumEntry = {
  id: '',
  professionId: '1',
  classId: '',
  semester: 0,
  isElective: false
};

export function Pensum() {

  const formPensum = useForm<PensumEntry>({
    resolver: zodResolver(pensumSchema),
    defaultValues: initinalValues,
  });

  const professionId = formPensum.watch('professionId');


  const [pensum, setPensum] = useState<PensumEntry[]>(mockPensum);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [selectedProfession, setSelectedProfession] = useState<string>('1');
  // const [formData, setFormData] = useState({
  //   classId: '',
  //   semester: 1,
  //   isElective: false
  // });

  // const selectedProfessionData = mockProfessions.find(p => p.id === selectedProfession);
  // const professionPensum = pensum.filter(p => p.professionId === selectedProfession);
  const selectedProfessionData = mockProfessions.find(p => p.id === professionId);
  const professionPensum = pensum.filter(p => p.professionId === professionId);

  // Group classes by semester
  const semesterData = Array.from({ length: selectedProfessionData?.totalSemesters || 8 }, (_, i) => {
    const semester = i + 1;
    const semesterClasses = professionPensum.filter(p => p.semester === semester);
    return {
      semester,
      classes: semesterClasses.map(p => ({
        ...p,
        class: mockClasses.find(c => c.id === p.classId)!
      }))
    };
  });

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

  const getTotalCredits = (semester: number) => {
    return professionPensum
      .filter(p => p.semester === semester)
      .reduce((total, p) => {
        const cls = mockClasses.find(c => c.id === p.classId);
        return total + (cls?.credits || 0);
      }, 0);
  };

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
        <TabsSemeter semesterData={semesterData} />

        {semesterData.map((sem) => (
          <TabsContent key={sem.semester} value={sem.semester.toString()}>
            <Card className='mt-6'>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Semester {sem.semester}</CardTitle>
                  <Badge variant="outline">
                    {getTotalCredits(sem.semester)} Total Credits
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {sem.classes.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {sem.classes.map((entry) => (
                      <CardClassBySemester key={entry.id} entry={entry} />
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