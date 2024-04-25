import { lazy, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate, useLocation} from "react-router-dom";
// import { DataClasses, DataPensum, DataProfession, DataScores, DataStudents, DataTeacher, Profile } from './components';
export const DataClasses = lazy(() => import('./components/AllComponents/DataClasses').then(module => ({ default: module.DataClasses })))
export const DataPensum = lazy(() => import('./components/AllComponents/DataPensum').then(module => ({ default: module.DataPensum })))
export const DataProfession = lazy(() => import('./components/AllComponents/DataProfession').then(module => ({ default: module.DataProfession })))
export const DataScores = lazy(() => import('./components/AllComponents/DataScores').then(module => ({ default: module.DataScores })))
export const DataStudents = lazy(() => import('./components/AllComponents/DataStudents').then(module => ({ default: module.DataStudents })))
export const DataTeacher = lazy(() => import('./components/AllComponents/DataTeacher').then(module => ({ default: module.DataTeacher })))
export const Profile = lazy(() => import('./components/AllComponents/Profile').then(module => ({ default: module.Profile })))

import Dashboard from "./pages/dashboard";
import { Login } from './pages/login';
import ViewComponents from "./pages/viewComponents";
import useStoreToken from './zustanStore/token';



const ProtecteRoutes = () => {
  const location = useLocation();
  const token = useStoreToken((state) => state.token)
  if(location!==null){
    if((location.pathname==='/dashboard' || location.pathname==='/dashboard/') && token){
      return <Navigate to={'/dashboard/home'} />
    }
    if(location.pathname!=='/dashboard' && location.pathname!=='/dashboard/' && token){
      return <Dashboard />
    }
    if(!token){
      return <Navigate to={'/'} />
    }
  }
  return null;
}

const VerifySession = () => {
  const token = useStoreToken((state) => state.token)
  if(token) return <Navigate to={'/dashboard/home'} />
  return <Login />
}

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<VerifySession/>} />,
      <Route path="dashboard" element={<ProtecteRoutes/>} >
        <Route path="home" element={<Profile />} />,
        <Route path="classes" element={<DataClasses />} />,
        <Route path="profession" element={<DataProfession />} />,
        <Route path="pensums" element={<DataPensum />} />,
        <Route path="teachers" element={<DataTeacher  />} />,
        <Route path="students" element={<DataStudents />} />,
        <Route path="record" element={<DataScores />} />
        <Route path="components" element={<ViewComponents />} />
      </Route>
    ,
  ])
);

function App() {
  return (
      <RouterProvider
        router={router}
        fallbackElement={<span>cargando....</span>}
      />
  )
}

export default App
