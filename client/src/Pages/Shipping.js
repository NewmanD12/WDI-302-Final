import { useState, useEffect } from 'react';
import React from 'react'
import { useAuth } from '../Hooks/Auth';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import './Shipping.css'

const Shipping = (props) => {

  const { userURLEndpoint, checkoutInfo, setCheckoutInfo } = props
  const auth = useAuth()
  const navigate = useNavigate()
  const [selectedShipping, setSelectedShipping] = useState('')
  const [shippingPrice, setShippingPrice] = useState('')

  // console.log(checkoutInfo)
  
  useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  console.log(auth)

  const {email, address, city, fName, lName, state, zipCode} = auth.shippingInfo

  const shippingTypes = ['USPS Priority Mail', 'UPS Ground', 'UPS 2nd Day Air', 'UPS Next Day Air']
  const shippingPrices = ['$10.85', '$12.22', '$17.66', '$23.97']

  // const handleSubmit = async () => {

  //   const shippingAndPrice = {selectedShipping, shippingPrice}
  //   setCheckoutInfo(shippingAndPrice)

  //   const newShippingInfo = {
  //     ...auth.shippingInfo,
  //     "selectedShipping" : selectedShipping,
  //     "shippingPrice" : shippingPrice
  //   }
  //   const addedResult = await auth.addShippingInfo(newShippingInfo, auth)
  //   if(addedResult){
  //     navigate('/payment')
  //   }
  // }
 
  // console.log(selectedShipping)

  console.log(checkoutInfo)

  return (
    <Container id='shipping-container'>
      <Row className='mt-5'>
        <Col>
          <a href='/cart' className="pagination-options">Cart</a><span> → </span>
          <a href='/shipping-info' className="pagination-options">Information</a><span> → </span>
          <a className="pagination-options">Shipping</a><span> → </span>
          <a className="pagination-options">Payment</a>
        </Col>
      </Row>
      <Container id='contact-container' className='mt-5'>

        <Row>
          <Col id='contact'>Contact</Col>
          <Col className='change-button'>Change</Col>
        </Row>
        <Row id='shipping-email'>
          {checkoutInfo.email ? <Col>{`${checkoutInfo.email}`}</Col>
            : (email ? <Col>{`${email}`}</Col> 
                : 
              '')
          }
        </Row>

        <Row className='mt-3'>
          <Col>Ship to:</Col>
          <Col className='change-button'>Change</Col>
        </Row>
        <Row id='shipping-address'>
          {checkoutInfo.address && <Col>{`${checkoutInfo.address}, ${checkoutInfo.city} ${checkoutInfo.state} ${checkoutInfo.zipCode}`}</Col>}
          {address && <Col>{`${address}, ${city} ${state} ${zipCode}`}</Col>}
        </Row>
        
      </Container>
      <Row className='mt-5'>
        <Col>
          <h4>Shipping Method</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form id='shipping-form'>
            {shippingTypes.map((type, index) => (
              <Container key={index} className="mb-3 individual-type" >
                <Row className='mt-3'>
                  <Col>
                    <Form.Check // prettier-ignore
                      type='radio'
                      label={`${type}`}
                      className='shipping-type'
                      value={`${type}`}
                      onChange={(e) => {
                        setSelectedShipping(e.target.value)
                        setShippingPrice(shippingPrices[index])
                        }
                      }
                    />
                  </Col>
                  <Col>
                    <p className='shipping-prices'>{shippingPrices[index]}</p>
                  </Col>
                </Row>
              </Container>
            ))}
          </Form>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Button id='continue-to-payment-button' onClick={ async () => {
            const shippingAndPrice = {selectedShipping, shippingPrice}
            let newShippingInfo = {}
            
            if(auth.shippingInfo.email){
              newShippingInfo = {
                ...auth.shippingInfo,
                "selectedShipping" : selectedShipping,
                "shippingPrice" : shippingPrice
              }
              // console.log(newShippingInfo)
            }
            else {
              newShippingInfo = {
                ...checkoutInfo,
                selectedShipping,
                shippingPrice
              }
            }
            
            const addedResult = await auth.addShippingInfo(newShippingInfo, auth)
            if(addedResult){
              setCheckoutInfo(newShippingInfo)
              navigate('/payment')
            }
          }
          }>Continue to payment</Button>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <a href='/shipping-info' id='return-to-info'>← Return to information</a>
        </Col>
      </Row>
    </Container>
  )
}

export default Shipping