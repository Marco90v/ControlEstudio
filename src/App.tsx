import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { Toaster } from '@/components/ui/sonner';
import { Layout } from '@/layouts/Layout';
import { Login } from '@/pages/Login';
import useAuth from '@/store/AuthStore';
import { lazy, Suspense, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { getSession, supabase } from '@/services/supabase';
import Spinner from './components/common/Spinner';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Classes = lazy(() => import('@/pages/Classes'));
const Professions = lazy(() => import('@/pages/Professions'));
const Pensum = lazy(() => import('@/pages/Pensum'));
const Professors = lazy(() => import('@/pages/Professors'));
const Students = lazy(() => import('@/pages/Students'));
const Grades = lazy(() => import('@/pages/Grades'));

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
        <Suspense fallback={<Spinner />}>
          <AppRoutes />
        </Suspense>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;