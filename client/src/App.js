import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './components/Welcome'
import Login from './components/Login';
import Register from './components/Register';

const userURLEndpoint = process.env.REACT_APP_USER_ENDPOINT

function App() {

  const router = createBrowserRouter([

    {
      path: '/',
      element : <Layout />,
      children : [
        {
          index : true,
          element : <Welcome />
        },
        {
          path : "/login",
          element : <Login />
        },
        {
          path : "/register",
          element : <Register 
                      userURLEndpoint={userURLEndpoint}
                    />
        }
      ]
    }

  ])



  return (
    <RouterProvider router={router}/>
  )
}

export default App;
