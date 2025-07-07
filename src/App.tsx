import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
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
import useAuth from '@/store/AuthStore';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { getSession, supabase } from '@/services/supabase';

function ProtectedRoute({ children }: { children: React.ReactNode }) {

  const {setSession, token} = useAuth(useShallow((state=>({
    setSession: state.setSession,
    token: state.token
  }))));

  useEffect(() => {
    getSession(setSession)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if(session){
        setSession(session);
      }
    });
  
    return () => {
      subscription.unsubscribe();
    }
  }, [setSession]);
  
  const isLoading = false;
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { profile } = useAuth();

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
                {profile?.role === 1 && (
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