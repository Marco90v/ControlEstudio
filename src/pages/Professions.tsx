import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Search, GraduationCap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { mockProfessions } from '@/data/mockData';
import type { Profession } from '@/types';

export function Professions() {
  const [professions, setProfessions] = useState<Profession[]>(mockProfessions);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProfession, setEditingProfession] = useState<Profession | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    totalSemesters: 8,
    description: ''
  });

  const filteredProfessions = professions.filter(prof =>
    prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProfession) {
      setProfessions(professions.map(prof => 
        prof.id === editingProfession.id 
          ? { ...editingProfession, ...formData }
          : prof
      ));
    } else {
      const newProfession: Profession = {
        id: (professions.length + 1).toString(),
        ...formData
      };
      setProfessions([...professions, newProfession]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', code: '', totalSemesters: 8, description: '' });
    setEditingProfession(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (prof: Profession) => {
    setEditingProfession(prof);
    setFormData({
      name: prof.name,
      code: prof.code,
      totalSemesters: prof.totalSemesters,
      description: prof.description || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setProfessions(professions.filter(prof => prof.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Professions</h1>
          <p className="text-muted-foreground">Manage university degree programs and majors</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Profession
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingProfession ? 'Edit Profession' : 'Add New Profession'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Profession Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="code">Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="totalSemesters">Total Semesters</Label>
                <Input
                  id="totalSemesters"
                  type="number"
                  min="6"
                  max="16"
                  value={formData.totalSemesters}
                  onChange={(e) => setFormData({ ...formData, totalSemesters: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProfession ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search professions by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Professions Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProfessions.map((prof) => (
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
        ))}
      </div>

      {filteredProfessions.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {searchTerm ? 'No professions found matching your search.' : 'No professions available.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}