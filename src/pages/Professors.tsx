import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Edit, Trash2, Search, UserCheck, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockProfessors, mockProfessions, mockClasses, mockProfessorAssignments } from '@/data/mockData';
import type { User, ProfessorAssignment } from '@/types';
import DialogAssignment from '@/features/professors/components/DialogAssignment';

export function Professors() {
  const [professors, setProfessors] = useState<User[]>(mockProfessors);
  const [assignments, setAssignments] = useState<ProfessorAssignment[]>(mockProfessorAssignments);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [editingProfessor, setEditingProfessor] = useState<User | null>(null);
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

  const handleProfessorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProfessor) {
      setProfessors(professors.map(prof => 
        prof.id === editingProfessor.id 
          ? { ...editingProfessor, ...professorFormData, role: 'Professor' as const }
          : prof
      ));
    } else {
      const newProfessor: User = {
        id: (professors.length + 5).toString(),
        ...professorFormData,
        role: 'Professor'
      };
      setProfessors([...professors, newProfessor]);
    }
    
    resetProfessorForm();
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAssignment: ProfessorAssignment = {
      id: (assignments.length + 1).toString(),
      professorId: selectedProfessor,
      ...assignmentFormData
    };
    
    setAssignments([...assignments, newAssignment]);
    resetAssignmentForm();
  };

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

  const handleEdit = (prof: User) => {
    setEditingProfessor(prof);
    setProfessorFormData({
      firstName: prof.firstName,
      lastName: prof.lastName,
      email: prof.email,
      contactNumber: prof.contactNumber,
      gender: prof.gender,
      profilePicture: prof.profilePicture || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setProfessors(professors.filter(prof => prof.id !== id));
    setAssignments(assignments.filter(assign => assign.professorId !== id));
  };

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
          {/* <Dialog open={isAssignmentDialogOpen} onOpenChange={setIsAssignmentDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => resetAssignmentForm()}>
                <Settings className="h-4 w-4 mr-2" />
                Assign Teaching
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Teaching Duties</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="professor">Professor</Label>
                  <Select
                    value={selectedProfessor}
                    onValueChange={setSelectedProfessor}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select professor" />
                    </SelectTrigger>
                    <SelectContent>
                      {professors.map((prof) => (
                        <SelectItem key={prof.id} value={prof.id}>
                          {prof.firstName} {prof.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="profession">Profession</Label>
                    <Select
                      value={assignmentFormData.professionId}
                      onValueChange={(value) => setAssignmentFormData({ ...assignmentFormData, professionId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select profession" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProfessions.map((prof) => (
                          <SelectItem key={prof.id} value={prof.id}>
                            {prof.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="class">Class</Label>
                    <Select
                      value={assignmentFormData.classId}
                      onValueChange={(value) => setAssignmentFormData({ ...assignmentFormData, classId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockClasses.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.code} - {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="semester">Semester</Label>
                    <Select
                      value={assignmentFormData.semester.toString()}
                      onValueChange={(value) => setAssignmentFormData({ ...assignmentFormData, semester: parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 8 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            Semester {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="shift">Shift</Label>
                    <Select
                      value={assignmentFormData.shift}
                      onValueChange={(value: 'Morning' | 'Afternoon' | 'Night') => 
                        setAssignmentFormData({ ...assignmentFormData, shift: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Morning">Morning</SelectItem>
                        <SelectItem value="Afternoon">Afternoon</SelectItem>
                        <SelectItem value="Night">Night</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="section">Section</Label>
                    <Select
                      value={assignmentFormData.section}
                      onValueChange={(value: 'A' | 'B' | 'C') => 
                        setAssignmentFormData({ ...assignmentFormData, section: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Section A</SelectItem>
                        <SelectItem value="B">Section B</SelectItem>
                        <SelectItem value="C">Section C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={resetAssignmentForm}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!selectedProfessor || !assignmentFormData.professionId || !assignmentFormData.classId}>
                    Assign
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog> */}
          <DialogAssignment isAssignmentDialogOpen={isAssignmentDialogOpen} setIsAssignmentDialogOpen={setIsAssignmentDialogOpen} />

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetProfessorForm()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Professor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingProfessor ? 'Edit Professor' : 'Add New Professor'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleProfessorSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={professorFormData.firstName}
                      onChange={(e) => setProfessorFormData({ ...professorFormData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={professorFormData.lastName}
                      onChange={(e) => setProfessorFormData({ ...professorFormData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={professorFormData.email}
                    onChange={(e) => setProfessorFormData({ ...professorFormData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactNumber">Contact Number</Label>
                    <Input
                      id="contactNumber"
                      value={professorFormData.contactNumber}
                      onChange={(e) => setProfessorFormData({ ...professorFormData, contactNumber: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={professorFormData.gender}
                      onValueChange={(value: 'Male' | 'Female' | 'Other') => 
                        setProfessorFormData({ ...professorFormData, gender: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="profilePicture">Profile Picture URL (Optional)</Label>
                  <Input
                    id="profilePicture"
                    type="url"
                    value={professorFormData.profilePicture}
                    onChange={(e) => setProfessorFormData({ ...professorFormData, profilePicture: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={resetProfessorForm}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingProfessor ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="professors" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="professors">Professors</TabsTrigger>
          <TabsTrigger value="assignments">Teaching Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="professors" className="space-y-4">
          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search professors by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Professors Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProfessors.map((prof) => {
              const professorAssignments = getProfessorAssignments(prof.id);
              return (
                <Card key={prof.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={prof.profilePicture} />
                          <AvatarFallback>
                            {prof.firstName[0]}{prof.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {prof.firstName} {prof.lastName}
                          </CardTitle>
                          <Badge variant="secondary" className="mt-1">
                            <UserCheck className="h-3 w-3 mr-1" />
                            Professor
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
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        <div>{prof.email}</div>
                        <div>{prof.contactNumber}</div>
                        <div>Gender: {prof.gender}</div>
                      </div>
                      <div className="pt-2 border-t border-border">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Assignments:</span>
                          <Badge variant="outline">
                            {professorAssignments.length} classes
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                <Card key={assignment.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                        <div>
                          <div className="text-sm text-muted-foreground">Professor</div>
                          <div className="font-medium">
                            {professor?.firstName} {professor?.lastName}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Class</div>
                          <div className="font-medium">
                            {classData?.code} - {classData?.name}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Details</div>
                          <div className="space-y-1">
                            <Badge variant="outline" className="text-xs">
                              {profession?.name}
                            </Badge>
                            <div className="text-sm">
                              Sem {assignment.semester} | {assignment.shift} | Sec {assignment.section}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setAssignments(assignments.filter(a => a.id !== assignment.id))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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