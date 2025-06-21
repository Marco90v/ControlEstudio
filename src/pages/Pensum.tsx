import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { mockPensum, mockProfessions, mockClasses } from '@/data/mockData';
import type { PensumEntry } from '@/types';
import PensumDialog from '@/features/classes/pensum/components/PensumDialog';

export function Pensum() {
  const [pensum, setPensum] = useState<PensumEntry[]>(mockPensum);
  const [selectedProfession, setSelectedProfession] = useState<string>('1');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [formData, setFormData] = useState({
  //   classId: '',
  //   semester: 1,
  //   isElective: false
  // });

  const selectedProfessionData = mockProfessions.find(p => p.id === selectedProfession);
  const professionPensum = pensum.filter(p => p.professionId === selectedProfession);

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

  const handleDelete = (id: string) => {
    setPensum(pensum.filter(p => p.id !== id));
  };

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
        
        <PensumDialog selectedProfession={selectedProfession} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
      </div>

      {/* Profession Selector */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <Label>Select Profession:</Label>
            <Select value={selectedProfession} onValueChange={setSelectedProfession}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockProfessions.map((profession) => (
                  <SelectItem key={profession.id} value={profession.id}>
                    {profession.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Curriculum Tabs */}
      <Tabs defaultValue="1" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          {semesterData.map((sem) => (
            <TabsTrigger key={sem.semester} value={sem.semester.toString()}>
              Sem {sem.semester}
            </TabsTrigger>
          ))}
        </TabsList>

        {semesterData.map((sem) => (
          <TabsContent key={sem.semester} value={sem.semester.toString()}>
            <Card>
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