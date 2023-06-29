import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { useAuth } from '../Hooks/Auth';
import CartProduct from './CartProduct';

const Cart = (props) => {

  const { userURLEndpoint } = props

  const auth = useAuth()
  const [user, setUser] = useState({})

  useEffect(() => {
    axios.get(`${userURLEndpoint}/single-user/${auth.userID}`)
            .then((res) => {
                setUser(res.data.user)
            })
            .catch((err) => {
                // console.log('error: ', err.toString())
            })
  }, [auth])

  const cart = user.cart
  
  return (
    <Container className='mt-5'>
      <h1>Cart</h1>
      <hr />
    <Row className='justify-content-start mt-5'>
        <Col sm={12}>
            {
              cart && cart.map((product, index) => {
                            return  <CartProduct 
                                      product={product}
                                      key={index}
                                    />
                          
                          })
                      
            }
        </Col>
      </Row>
    </Container>
  )
}

export default Cart