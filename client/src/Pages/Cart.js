import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import axios from "axios";
import { useAuth } from '../Hooks/Auth';
import { useNavigate } from 'react-router-dom';
import CartProduct from '../components/CartProduct';
import './Cart.css'

const Cart = (props) => {

  const { userURLEndpoint } = props
  const navigate = useNavigate()

  const auth = useAuth()
  const [user, setUser] = useState({})
  const [total, setTotal] = useState(-1)

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

  const calculateSubtotal = () => {
    const prices = cart.map((item) => item.price * item.quantity)
    let totalToPass = 0
    for(let price of prices){
      totalToPass += price
    }
    return totalToPass
  }

  if(cart && total === -1){
    setTotal(calculateSubtotal())
  }
  
  return (
    <Container className='mt-5'>
      <h1>Cart</h1>
      <hr />
      <Row className='justify-content-center mt-5'>
          <Col lg={12}>
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
      <Row>
        <Col md={8} id='total-container'>
              <Row className='mt-3'>
                <Col><h4>Today's subtotal</h4></Col>
                <Col id="subtotal"><p>${total}</p></Col>
              </Row>
              <Row id="tax-row" className='mt-2'>
                <Col><h4>Shipping & Tax</h4></Col>
                <Col><p id='tax'>Calculated at next step</p></Col>
              </Row>
              <Row className='mt-3'>
                <Col><h4>Total</h4></Col>
                <Col><h4 id='total'>${total}</h4></Col>
              </Row>
        </Col>
      </Row>
      <Row md={6}>
        <Col id='checkout-container'>
          <Button id='checkout-button' onClick={() => navigate('/shipping-info')}>Checkout</Button>
          <a href='/shop' id='keep-shopping'>Keep Shopping</a>
        </Col>
      </Row>
    </Container>
  )
}

export default Cart