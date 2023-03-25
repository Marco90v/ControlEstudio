import store from './store/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate} from "react-router-dom";
import Classes from "./pages/classes";
import Inicio from './pages/inicio';
import Profession from './pages/profession';
import Pensum from './pages/pensum';
import Teacher from './pages/teacher';
import Students from './pages/students';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<h1>Inicio</h1>} />,
    <Route path="dashboard"  element={<Navigate to="/dashboard/inicio" />} />,
    <Route path="dashboard/inicio" element={<Inicio />} />,
    <Route path="dashboard/classes" element={<Classes />} />,
    <Route path="dashboard/profession" element={<Profession />} />,
    <Route path="dashboard/pensums" element={<Pensum />} />,
    <Route path="dashboard/teachers" element={<Teacher />} />,
    <Route path="dashboard/students" element={<Students />} />
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
