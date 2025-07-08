import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { BookOpen } from 'lucide-react';
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
import { getNewPensum, getTotalCredits } from '@/lib/utils';
import { useLoadPensums } from '@/hooks/useLoadPensums';
import Spinner from '@/components/common/Spinner';
import { usePageStatus } from '@/hooks/usePageStatus';
import Error from '@/components/common/Error';

function Pensum() {
  const pensums = usePensum(useShallow((s=>({ pensums: s.pensums, loading: s.loading, error: s.error }))));
  const classes = useClasses(useShallow((s=>({ classes: s.classes, loading: s.loading, error: s.error }))));
  const states = [classes, pensums];
  const { isLoading, firstError } = usePageStatus(states);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useLoadClasses();
  useLoadPensums();

  const formPensum = useForm<PensumEntry>({
    resolver: zodResolver(pensumSchema),
  });
  const IdProfession = formPensum.watch('IdProfession');
  const NewPensum = getNewPensum(pensums.pensums, classes.classes, IdProfession);

  if (isLoading) return <Spinner />;
  if (firstError) return <Error error={firstError} />;

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

export default Pensum;