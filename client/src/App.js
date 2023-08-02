import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './Pages/Welcome'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Shop from './Pages/Shop';
import Blog from './Pages/Blog';
import Cart from './Pages/Cart'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Subscribe from './Pages/Subscribe';
import BrewGuides from './Pages/BrewGuides';
import IndividualProduct from './components/IndividualProduct';
import AddProduct from './Pages/AddProduct';
import ShippingInfo from './Pages/ShippingInfo';
import Shipping from './Pages/Shipping';
import Payment from './Pages/Payment';

const userURLEndpoint = process.env.REACT_APP_USER_ENDPOINT
const productURLEndpoint = process.env.REACT_APP_PRODUCTS_ENDPOINT


function App() {

  const [products, setProducts] = useState([])
  const [checkoutInfo, setCheckoutInfo] = useState({})

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
          path : '/brew-guides',
          element : <BrewGuides 
          
                    /> 
        }, 
        {
          path : '/individual-product/:name',
          element : <IndividualProduct 
                      products={products}
                      userURLEndpoint={userURLEndpoint}
                    />
        },
        {
          path : '/cart',
          element : <Cart
                      userURLEndpoint={userURLEndpoint}                      
                    />
        },
        {
          path : '/add-product',
          element : <AddProduct 
                      productURLEndpoint={productURLEndpoint}
                    />
        },
        {
          path : '/shipping-info',
          element : <ShippingInfo 
                      userURLEndpoint={userURLEndpoint} 
                      checkoutInfo={checkoutInfo}
                      setCheckoutInfo={setCheckoutInfo}
                    />
        },
        {
          path : '/shipping',
          element : <Shipping 
                      userURLEndpoint={userURLEndpoint} 
                      checkoutInfo={checkoutInfo}
                      setCheckoutInfo={setCheckoutInfo}
                    />
        },
        {
          path : '/payment',
          element : <Payment 
                      checkoutInfo={checkoutInfo}
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
