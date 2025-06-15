// import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar,
  BookOpen,
  Users,
  GraduationCap,
  ClipboardList
} from 'lucide-react';
import { mockClasses, mockStudents, mockProfessors, mockProfessions } from '@/data/mockData';

const user = {
  role: 'Admin',
  name: 'Admin',
  email: 'admin@admin.com',
  image: 'https://i.pravatar.cc/300?img=1',
  firstName: 'Admin',
  lastName: 'Admin',
  profilePicture: 'https://i.pravatar.cc/300?img=1',
  currentSemester: 1,
  professionId: 1,
  gender: 'Male',
  contactNumber: '+1-555-0101',
};

export function Dashboard() {
  // const { user } = useAuth();

  if (!user) return null;

  const getStats = () => {
    if (user.role === 'Admin') {
      return [
        { title: 'Total Classes', value: mockClasses.length, icon: BookOpen, color: 'bg-blue-500' },
        { title: 'Total Students', value: mockStudents.length, icon: Users, color: 'bg-green-500' },
        { title: 'Total Professors', value: mockProfessors.length, icon: GraduationCap, color: 'bg-purple-500' },
        { title: 'Total Professions', value: mockProfessions.length, icon: ClipboardList, color: 'bg-orange-500' }
      ];
    } else if (user.role === 'Professor') {
      return [
        { title: 'My Classes', value: 2, icon: BookOpen, color: 'bg-blue-500' },
        { title: 'Students Assigned', value: 15, icon: Users, color: 'bg-green-500' }
      ];
    } else {
      return [
        { title: 'Current Semester', value: user.currentSemester || 1, icon: Calendar, color: 'bg-blue-500' },
        { title: 'Completed Classes', value: 8, icon: BookOpen, color: 'bg-green-500' }
      ];
    }
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.firstName}! Here's an overview of your academic information.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Profile Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-6">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-border"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold border-4 border-border">
                  {user.firstName[0]}{user.lastName[0]}
                </div>
              )}
            </div>

            {/* User Details */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {user.firstName} {user.lastName}
                  </h3>
                  <Badge variant="secondary" className="w-fit">
                    {user.role}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{user.contactNumber}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Gender:</span>
                    <div className="font-medium">{user.gender}</div>
                  </div>
                  
                  {user.role === 'Student' && user.currentSemester && (
                    <div>
                      <span className="text-muted-foreground">Current Semester:</span>
                      <div className="font-medium">{user.currentSemester}</div>
                    </div>
                  )}
                  
                  {user.professionId && (
                    <div>
                      <span className="text-muted-foreground">Profession:</span>
                      <div className="font-medium">
                        {mockProfessions.find(p => p.id === user.professionId)?.name || 'N/A'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user.role === 'Admin' && (
              <>
                <div className="p-4 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Manage Classes</h3>
                  <p className="text-sm text-muted-foreground">Add, edit, or delete classes</p>
                </div>
                <div className="p-4 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Manage Students</h3>
                  <p className="text-sm text-muted-foreground">Handle student enrollment</p>
                </div>
                <div className="p-4 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <ClipboardList className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">View Grades</h3>
                  <p className="text-sm text-muted-foreground">Monitor academic performance</p>
                </div>
              </>
            )}
            
            {user.role === 'Professor' && (
              <>
                <div className="p-4 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <ClipboardList className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Enter Grades</h3>
                  <p className="text-sm text-muted-foreground">Input student grades</p>
                </div>
                <div className="p-4 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">My Students</h3>
                  <p className="text-sm text-muted-foreground">View assigned students</p>
                </div>
              </>
            )}
            
            {user.role === 'Student' && (
              <>
                <div className="p-4 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <ClipboardList className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">View Grades</h3>
                  <p className="text-sm text-muted-foreground">Check your academic progress</p>
                </div>
                <div className="p-4 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Current Classes</h3>
                  <p className="text-sm text-muted-foreground">View semester schedule</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}