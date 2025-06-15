import { Outlet } from 'react-router';
// import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
// import { Sidebar } from './Sidebar';

export function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-muted/30 p-6 w-full">
          <div className="max-w-full mx-auto">
            <Outlet />
            {/* {children} */}
          </div>
        </main>
      </div>
    </div>
  );
}