import { store } from './store/store';
import { Provider, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate, Outlet, BrowserRouter, Routes, useLocation} from "react-router-dom";
import Classes from "./pages/classes";
import Inicio from './pages/inicio';
import Profession from './pages/profession';
import Pensum from './pages/pensum';
import Teacher from './pages/teacher';
import Students from './pages/students';
import Scores from './pages/Scores';
import { Login } from './pages/Login';

const ProtecteRoutes = () => {
  const location = useLocation();
  const {token} = useSelector((state:store) => state.session);

  if(location!==null){
    if((location.pathname==='/dashboard' || location.pathname==='/dashboard/') && token){
      return <Navigate to={'/dashboard/home'} />
    }
    if(location.pathname!=='/dashboard' && location.pathname!=='/dashboard/' && token){
      return <Outlet/>
    }
    if(!token){
      return <Navigate to={'/'} />
    }
  }
  return null;
}

const VerifySession = () => {
  const {token} = useSelector((state:store) => state.session);
  if(token) return <Navigate to={'/dashboard/home'} />
  return <Login />
}

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<VerifySession/>} />,
    // <Route path="dashboard"  element={<Navigate to="/dashboard/home" />} >
    <Route path="dashboard" element={<ProtecteRoutes/>} >
      <Route path="home" element={<Inicio />} />,
      <Route path="classes" element={<Classes />} />,
      <Route path="profession" element={<Profession />} />,
      <Route path="pensums" element={<Pensum />} />,
      <Route path="teachers" element={<Teacher />} />,
      <Route path="students" element={<Students />} />,
      <Route path="record" element={<Scores />} />
    </Route>,
  ])
);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider
          router={router}
          fallbackElement={<span>cargando....</span>}
        />
      </Provider>
    </>
  )
}

export default App
