import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate, useLocation} from "react-router-dom";
import { Login } from './pages/login';
import useStoreToken from './zustanStore/token';
import { DataClasses, DataPensum, DataProfession, DataScores, DataStudents, DataTeacher, Profile } from './components';
import Dashboard from "./pages/dashboard";
import ViewComponents from "./pages/viewComponents";

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
