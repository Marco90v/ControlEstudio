import { Button } from '@/components/ui/button';
import { LogOut, Sun, Moon, Monitor } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { signOut } from '@/services/supabase';
import useAuth from '@/store/AuthStore';
import { useShallow } from 'zustand/react/shallow';
import { getRoles } from '@/lib/utils';
import Avatar from '@/components/common/Avatar';
import useClasses from '@/store/useClasses';
import useGrades from '@/store/useGrades';
import usePensum from '@/store/usePensum';
import useProfessions from '@/store/useProfessions';
import useProfessorAssignment from '@/store/useProfessorAssignment';
import useProfessors from '@/store/useProfessors';
import useStudents from '@/store/useStudents';

export function Header() {
  const {close, profile} = useAuth(useShallow((state=>({
    close: state.close,
    profile: state.profile
  }))));

  const themeIcon = {
    light: Sun,
    dark: Moon,
    system: Monitor
  };

  const theme = "light";

  const ThemeIcon = themeIcon[theme];

  const setTheme = (theme: string) => {
    console.log(theme);
  };

  const logout = () => {
    signOut().then((data)=>{
      if(data){
        close();
        useClasses.persist.clearStorage();
        useGrades.persist.clearStorage();
        usePensum.persist.clearStorage();
        useProfessions.persist.clearStorage();
        useProfessorAssignment.persist.clearStorage();
        useProfessors.persist.clearStorage();
        useStudents.persist.clearStorage();
      }
    });
  };

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-foreground">
            Academic Control System
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <ThemeIcon className="h-5 w-5" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Monitor className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          {profile && (
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-foreground">
                  {profile.names} {profile.lastNames}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {getRoles(profile.role)}
                </p>
              </div>
              
              <Avatar profile={profile} size="small" />

              <Button 
                variant="ghost" 
                size="icon"
                onClick={logout}
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}