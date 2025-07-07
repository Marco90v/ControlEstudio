import { Navigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Loader2 } from 'lucide-react';
import { useForm, type FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Login } from '@/types';
import { loginSchema } from '@/features/Login/schema';
import { Form } from '@/components/ui/form';
import InputForm from '@/components/common/InputForm';
import { signIn } from '@/services/supabase';
import useAuth from '@/store/AuthStore';
import { useShallow } from "zustand/react/shallow";
import { demoCredentials } from '@/lib/utils';

export function Login() {

  const {setToken, token} = useAuth(useShallow((state=>({
    setToken: state.setToken,
    token: state.token
  }))));

  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });
  
  const isLoading = false;

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = (data: FieldValues) => {
    signIn(data.email, data.password).then((data)=>{
      if(data){
        setToken(data.session.access_token);
      }
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)();
  };

  const setCredentials = (credentials:Login) => {
    form.setValue("email", credentials.email);
    form.setValue("password", credentials.password);
    form.setValue("role", credentials.role);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Title */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 bg-primary rounded-full">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">UniControl</h1>
          <p className="text-muted-foreground">Academic Control System</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <InputForm name='email' label='Email' placeholder="Enter your email" type="email" />
                </div>
                <div className="space-y-2">
                  <InputForm name='password' label='Password' placeholder="Enter your password" type="password" />
                </div>

                <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Demo Credentials</CardTitle>
            <CardDescription className="text-xs">
              Use these credentials to test different roles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {demoCredentials.map((cred, index) => (
              <div key={index} className="text-xs space-y-1 p-2 bg-muted rounded cursor-pointer" onClick={()=>setCredentials(cred)}>
                <div className="font-medium">{cred.role}</div>
                <div className="text-muted-foreground">
                  Email: {cred.email}
                </div>
                <div className="text-muted-foreground">
                  Password: {cred.password}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}