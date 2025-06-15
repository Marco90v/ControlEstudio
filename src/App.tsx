import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from '@/components/ui/sonner';
import { Layout } from '@/layouts/Layout';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { Classes } from '@/pages/Classes';
import { Professions } from '@/pages/Professions';

import { Pensum } from '@/pages/Pensum';
import { Professors } from '@/pages/Professors';
import { Students } from '@/pages/Students';
import { Grades } from '@/pages/Grades';

const user = {
  role: 'Admin',
  name: 'Admin',
  email: 'admin@admin.com',
  image: 'https://i.pravatar.cc/300?img=1',
  firstName: 'Admin',
  lastName: 'Admin',
  profilePicture: 'https://i.pravatar.cc/300?img=1',
};

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // const { user, isLoading } = useAuth();

  const isLoading = false;
  
  // if (isLoading) {
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  // const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                {user?.role === 'Admin' && (
                  <>
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/professions" element={<Professions />} />
                    <Route path="/pensum" element={<Pensum />} />
                    <Route path="/professors" element={<Professors />} />
                    <Route path="/students" element={<Students />} />
                  </>
                )}
                <Route path="/grades" element={<Grades />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    // <ThemeProvider>
    //   <AuthProvider>
    //     <Router>
    //       <div className="min-h-screen bg-background font-sans antialiased">
    //         <AppRoutes />
    //         <Toaster />
    //       </div>
    //     </Router>
    //   </AuthProvider>
    // </ThemeProvider>
    <Router>
      <div className="min-h-screen bg-background font-sans antialiased">
        <AppRoutes />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;