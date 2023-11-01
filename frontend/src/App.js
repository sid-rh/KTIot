
import './App.css';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import {Container} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllDevices from './pages/AllDevices';

function App() {

  const Layout = () => {
    return (
      <>
      
       <Header/> 
        <Container className='my-2'>
          <Outlet />
        </Container>
        
        
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path:'/assign',
          element:<AllDevices/>,
        }
        
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div className="App">
      <div className="container">
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar/>
    </div>
    </div>
  );
}

export default App;
