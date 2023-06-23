import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './components/Welcome'

function App() {

  const router = createBrowserRouter([

    {
      path: '/',
      element : <Layout />,
      children : [
        {
          index : true,
          element : <Welcome />
        }
      ]
    }

  ])



  return (
    <RouterProvider router={router}/>
  )
}

export default App;
