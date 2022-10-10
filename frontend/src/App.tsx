import store from './store/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate} from "react-router-dom";
import Classes from "./pages/classes";
import Inicio from './pages/inicio';
import Profession from './pages/profession';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<h1>Inicio</h1>} />,
    <Route path="dashboard"  element={<Navigate to="/dashboard/inicio" />} />,
    <Route path="dashboard/inicio" element={<Inicio />} />,
    <Route path="dashboard/classes" element={<Classes />} />,
    <Route path="dashboard/profession" element={<Profession />} />
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
