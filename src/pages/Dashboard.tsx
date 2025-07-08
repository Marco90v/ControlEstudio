import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {  Mail,  Phone,  BookOpen, Users, ClipboardList, User as U } from 'lucide-react';
import useAuth from '@/store/AuthStore';
import { useShallow } from 'zustand/react/shallow';
import { getCurrentSemester, getNameProfession, getRoles } from '@/lib/utils';
import Avatar from '@/components/common/Avatar';
import { useLoadStudents } from '@/hooks/useLoadStudents';
import useStudents from '@/store/useStudents';
import useProfessions from '@/store/useProfessions';
import { useLoadProfessions } from '@/hooks/useLoadProfessions';
import { ADMIN, PROFESSOR, STUDENT } from '@/lib/const';
import Spinner from '@/components/common/Spinner';
import Error from '@/components/common/Error';
import { usePageStatus } from '@/hooks/usePageStatus';
import { useLoadProfile } from '@/hooks/useLoadProfile';

function Dashboard() {
  const auth = useAuth(useShallow((s)=>({ token: s.token, profile: s.profile, loading: s.loading, error: s.error })));
  const students = useStudents(useShallow((s)=>({ students: s.students, loading: s.loading, error: s.error })));
  const professions = useProfessions(useShallow((s)=>({ professions: s.professions, loading: s.loading, error: s.error })));
  const states = [auth, students, professions];  
  const { isLoading, firstError } = usePageStatus(states);

  useLoadProfile();
  useLoadStudents();
  useLoadProfessions();
  
  // const getStats = () => {
  //   if (profile?.role === 1) {
  //     return [
  //       { title: 'Total Classes', value: mockClasses.length, icon: BookOpen, color: 'bg-blue-500' },
  //       { title: 'Total Students', value: mockStudents.length, icon: Users, color: 'bg-green-500' },
  //       { title: 'Total Professors', value: mockProfessors.length, icon: GraduationCap, color: 'bg-purple-500' },
  //       { title: 'Total Professions', value: mockProfessions.length, icon: ClipboardList, color: 'bg-orange-500' }
  //     ];
  //   } else if (profile?.role === 2) {
  //     return [
  //       { title: 'My Classes', value: 2, icon: BookOpen, color: 'bg-blue-500' },
  //       { title: 'Students Assigned', value: 15, icon: Users, color: 'bg-green-500' }
  //     ];
  //   } else {
  //     return [
  //       { title: 'Current Semester', value: profile?.currentSemester || 1, icon: Calendar, color: 'bg-blue-500' },
  //       { title: 'Completed Classes', value: 8, icon: BookOpen, color: 'bg-green-500' }
  //     ];
  //   }
  // };

  // const stats = getStats();

  if (isLoading) return <Spinner />;
  if (firstError) return <Error error={firstError} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {auth.profile?.names}! Here's an overview of your academic information.
        </p>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      </div> */}

      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <U className="h-5 w-5" />
            <span>Profile Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-6">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <Avatar profile={auth.profile} size="big" />
            </div>

            {/* User Details */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {auth.profile?.names} {auth.profile?.lastNames}
                  </h3>
                  <Badge variant="secondary" className="w-fit">
                    {getRoles(auth.profile?.role)}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{auth.profile?.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{auth.profile?.phone}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Gender:</span>
                    <div className="font-medium">{auth.profile?.sex}</div>
                  </div>
                  
                  {getRoles(auth.profile?.role) === STUDENT && getCurrentSemester(students.students, auth.profile) && (
                    <div>
                      <span className="text-muted-foreground">Current Semester:</span>
                      <div className="font-medium">{getCurrentSemester(students.students, auth.profile)}</div>
                    </div>
                  )}
                  
                  {(getRoles(auth.profile?.role) === 'Student' && students.students) && (
                    <div>
                      <span className="text-muted-foreground">Profession:</span>
                      <div className="font-medium">
                        {getNameProfession(professions.professions, students.students[0]?.professionId)}
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
            {getRoles(auth.profile?.role) === ADMIN && (  
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
            
            {getRoles(auth.profile?.role) === PROFESSOR && (
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
            
            {getRoles(auth.profile?.role) === STUDENT && (
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

export default Dashboard;