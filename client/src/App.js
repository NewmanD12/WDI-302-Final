import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './components/Welcome'
import Login from './components/Login';
import Register from './components/Register';
import Shop from './components/Shop';
import Blog from './components/Blog';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Subscribe from './components/Subscribe';
import BrewGuides from './components/BrewGuides';

const userURLEndpoint = process.env.REACT_APP_USER_ENDPOINT
const productURLEndpoint = process.env.REACT_APP_PRODUCTS_ENDPOINT


function App() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(`${productURLEndpoint}/all-products`)
          .then((res) => {
            setProducts(res.data.products)
            })
          .catch((err) => console.log(err))
  }, [])


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
        },
        {
          path : "/shop",
          element : <Shop 
                      products={products}
                    />
        },
        {
          path : '/subscribe',
          element : <Subscribe 
                    
                    />
        }, 
        {
          path : '/blog',
          element : <Blog 
          
                    /> 
        },
        {
          path : '/brewguides',
          element : <BrewGuides 
          
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
