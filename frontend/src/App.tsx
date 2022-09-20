import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from "react-router-dom";
import Classes from "./pages/classes";
import Inicio from './pages/inicio';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<h1>Inicio</h1>} />,
    <Route path="dashboard" element={<Inicio />} />,
    <Route path="dashboard/classes" element={<Classes />} />
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
