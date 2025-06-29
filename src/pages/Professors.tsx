import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
// import { Plus, Edit, Trash2, Search, UserCheck, Settings } from 'lucide-react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockProfessors, mockProfessions, mockClasses, mockProfessorAssignments } from '@/data/mockData';
import type { User, ProfessorAssignment, Professor } from '@/types';
import DialogAssignment from '@/features/professors/components/DialogAssignment';
import DialogProfessor from '@/features/professors/components/DialogProfessor';
import CardProfessor from '@/features/professors/components/CardProfessor';
import Filter from '@/components/common/Filter';
import CardAssignament from '@/features/professors/components/CardAssignament';

export function Professors() {
  const [professors, setProfessors] = useState<Professor[]>(mockProfessors);
  const [assignments, setAssignments] = useState<ProfessorAssignment[]>(mockProfessorAssignments);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(null);
  const [selectedProfessor, setSelectedProfessor] = useState<string>('');
  
  const [professorFormData, setProfessorFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    profilePicture: ''
  });

  const [assignmentFormData, setAssignmentFormData] = useState({
    professionId: '',
    classId: '',
    semester: 1,
    shift: 'Morning' as 'Morning' | 'Afternoon' | 'Night',
    section: 'A' as 'A' | 'B' | 'C'
  });

  const filteredProfessors = professors.filter(prof =>
    prof.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleProfessorSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   if (editingProfessor) {
  //     setProfessors(professors.map(prof => 
  //       prof.id === editingProfessor.id 
  //         ? { ...editingProfessor, ...professorFormData, role: 'Professor' as const }
  //         : prof
  //     ));
  //   } else {
  //     const newProfessor: User = {
  //       id: (professors.length + 5).toString(),
  //       ...professorFormData,
  //       role: 'Professor'
  //     };
  //     setProfessors([...professors, newProfessor]);
  //   }
    
  //   resetProfessorForm();
  // };

  // const handleAssignmentSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   const newAssignment: ProfessorAssignment = {
  //     id: (assignments.length + 1).toString(),
  //     professorId: selectedProfessor,
  //     ...assignmentFormData
  //   };
    
  //   setAssignments([...assignments, newAssignment]);
  //   resetAssignmentForm();
  // };

  const resetProfessorForm = () => {
    setProfessorFormData({
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      gender: 'Male',
      profilePicture: ''
    });
    setEditingProfessor(null);
    setIsDialogOpen(false);
  };

  const resetAssignmentForm = () => {
    setAssignmentFormData({
      professionId: '',
      classId: '',
      semester: 1,
      shift: 'Morning',
      section: 'A'
    });
    setSelectedProfessor('');
    setIsAssignmentDialogOpen(false);
  };

  // const handleEdit = (prof: User) => {
  //   setEditingProfessor(prof);
  //   setProfessorFormData({
  //     firstName: prof.firstName,
  //     lastName: prof.lastName,
  //     email: prof.email,
  //     contactNumber: prof.contactNumber,
  //     gender: prof.gender,
  //     profilePicture: prof.profilePicture || ''
  //   });
  //   setIsDialogOpen(true);
  // };

  // const handleDelete = (id: string) => {
  //   setProfessors(professors.filter(prof => prof.id !== id));
  //   setAssignments(assignments.filter(assign => assign.professorId !== id));
  // };

  const getProfessorAssignments = (professorId: string) => {
    return assignments.filter(assign => assign.professorId === professorId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Professors</h1>
          <p className="text-muted-foreground">Manage university professors and their teaching assignments</p>
        </div>
        
        <div className="flex space-x-2">
          <DialogAssignment isAssignmentDialogOpen={isAssignmentDialogOpen} setIsAssignmentDialogOpen={setIsAssignmentDialogOpen} />

          <DialogProfessor isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} editingProfessor={editingProfessor} setEditingProfessor={setEditingProfessor} />
        </div>
      </div>

      <Tabs defaultValue="professors" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="professors">Professors</TabsTrigger>
          <TabsTrigger value="assignments">Teaching Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="professors" className="space-y-4">
          {/* Search */}
          <Filter setSearchTerm={setSearchTerm} placeholder="Search professors by name or email..." />

          {/* Professors Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProfessors.map((prof) => {
              const professorAssignments = getProfessorAssignments(prof.id);
              return (
                // <Card key={prof.id} className="hover:shadow-md transition-shadow">
                //   <CardHeader>
                //     <div className="flex justify-between items-start">
                //       <div className="flex items-center space-x-3">
                //         <Avatar>
                //           <AvatarImage src={prof.profilePicture} />
                //           <AvatarFallback>
                //             {prof.firstName[0]}{prof.lastName[0]}
                //           </AvatarFallback>
                //         </Avatar>
                //         <div>
                //           <CardTitle className="text-lg">
                //             {prof.firstName} {prof.lastName}
                //           </CardTitle>
                //           <Badge variant="secondary" className="mt-1">
                //             <UserCheck className="h-3 w-3 mr-1" />
                //             Professor
                //           </Badge>
                //         </div>
                //       </div>
                //       <div className="flex space-x-1">
                //         <Button
                //           variant="ghost"
                //           size="icon"
                //           onClick={() => handleEdit(prof)}
                //         >
                //           <Edit className="h-4 w-4" />
                //         </Button>
                //         <Button
                //           variant="ghost"
                //           size="icon"
                //           onClick={() => handleDelete(prof.id)}
                //         >
                //           <Trash2 className="h-4 w-4" />
                //         </Button>
                //       </div>
                //     </div>
                //   </CardHeader>
                //   <CardContent>
                //     <div className="space-y-2">
                //       <div className="text-sm text-muted-foreground">
                //         <div>{prof.email}</div>
                //         <div>{prof.contactNumber}</div>
                //         <div>Gender: {prof.gender}</div>
                //       </div>
                //       <div className="pt-2 border-t border-border">
                //         <div className="flex justify-between text-sm">
                //           <span className="text-muted-foreground">Assignments:</span>
                //           <Badge variant="outline">
                //             {professorAssignments.length} classes
                //           </Badge>
                //         </div>
                //       </div>
                //     </div>
                //   </CardContent>
                // </Card>
                <CardProfessor
                  key={prof.id}
                  professor={prof}
                  professorAssignments={professorAssignments}
                  setEditingProfessor={setEditingProfessor}
                  setIsDialogOpen={setIsDialogOpen}
                />
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <div className="grid gap-4">
            {assignments.map((assignment) => {
              const professor = professors.find(p => p.id === assignment.professorId);
              const profession = mockProfessions.find(p => p.id === assignment.professionId);
              const classData = mockClasses.find(c => c.id === assignment.classId);
              
              return (
                <CardAssignament
                  key={assignment.id}
                  assignment={assignment}
                  professor={professor}
                  profession={profession}
                  classData={classData}
                  setAssignments={setAssignments}
                />
              );
            })}
          </div>

          {assignments.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No teaching assignments yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}