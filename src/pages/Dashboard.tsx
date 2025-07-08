import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {  Mail,  Phone,  BookOpen, Users, ClipboardList, User as U } from 'lucide-react';
import useAuth from '@/store/AuthStore';
import { getPerson, getUser } from '@/services/supabase';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { getCurrentSemester, getNameProfession, getRoles } from '@/lib/utils';
import Avatar from '@/components/common/Avatar';
import { useLoadStudents } from '@/hooks/useLoadStudents';
import useStudents from '@/store/useStudents';
import useProfessions from '@/store/useProfessions';
import { useLoadProfessions } from '@/hooks/useLoadProfessions';
import { STUDENT } from '@/lib/const';

export function Dashboard() {
  const { token, profile, setProfile } = useAuth(useShallow((state)=>({
    token: state.token,
    profile: state.profile,
    setProfile: state.setProfile
  })));

  const { students } = useStudents(useShallow((state)=>({
    students: state.students,
  })));
   const { professions } = useProfessions(useShallow((state)=>({
    professions: state.professions,
  })));

  useLoadStudents();
  useLoadProfessions();
  
  // if (!profile) return null;
  
  useEffect(() => {
  const fetchProfile = async () => {
    if (profile) return
    
    try {
      const data = await getUser()
      const user = data?.user
      if (!user) return
      
      const personData = await getPerson(user.id)
      if (Array.isArray(personData) && personData.length > 0) {
        const { roles, ...rest } = personData[0]
        const newData = { ...rest, nameRole: roles?.names }
        setProfile(newData)
      }
    } catch (error) {
      console.error("Error loading profile:", error)
    }
  }

  fetchProfile()
}, [profile, setProfile, token])
  
  

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {profile?.names}! Here's an overview of your academic information.
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
              <Avatar profile={profile} size="big" />
            </div>

            {/* User Details */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {profile?.names} {profile?.lastNames}
                  </h3>
                  <Badge variant="secondary" className="w-fit">
                    {getRoles(profile?.role)}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{profile?.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{profile?.phone}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Gender:</span>
                    <div className="font-medium">{profile?.sex}</div>
                  </div>
                  
                  {getRoles(profile?.role) === STUDENT && getCurrentSemester(students, profile) && (
                    <div>
                      <span className="text-muted-foreground">Current Semester:</span>
                      <div className="font-medium">{getCurrentSemester(students, profile)}</div>
                    </div>
                  )}
                  
                  {(getRoles(profile?.role) === 'Student' && students) && (
                    <div>
                      <span className="text-muted-foreground">Profession:</span>
                      <div className="font-medium">
                        {getNameProfession(professions, students[0]?.professionId)}
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
            {getRoles(profile?.role) === "Admin" && (  
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
            
            {profile?.role === 2 && (
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
            
            {profile?.role === 3 && (
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