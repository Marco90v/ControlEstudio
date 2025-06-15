import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen,
  Users,
  GraduationCap,
  UserCheck,
  FileText,
  ClipboardList,
  Menu,
  X,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const menuItems = [
  { 
    title: 'Dashboard', 
    href: '/dashboard', 
    icon: Home, 
    roles: ['Admin', 'Professor', 'Student'] 
  },
  { 
    title: 'Classes', 
    href: '/classes', 
    icon: BookOpen, 
    roles: ['Admin'] 
  },
  { 
    title: 'Professions', 
    href: '/professions', 
    icon: GraduationCap, 
    roles: ['Admin'] 
  },
  { 
    title: 'Academic Curriculum', 
    href: '/pensum', 
    icon: FileText, 
    roles: ['Admin'] 
  },
  { 
    title: 'Professors', 
    href: '/professors', 
    icon: UserCheck, 
    roles: ['Admin'] 
  },
  { 
    title: 'Students', 
    href: '/students', 
    icon: Users, 
    roles: ['Admin'] 
  },
  { 
    title: 'Grades', 
    href: '/grades', 
    icon: ClipboardList, 
    roles: ['Admin', 'Professor', 'Student'] 
  }
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const availableMenuItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-40 h-screen w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-border px-6">
            <GraduationCap className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-bold text-foreground">UniControl</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {availableMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          {user && (
            <div className="border-t border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  {user.firstName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user.role.toLowerCase()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}