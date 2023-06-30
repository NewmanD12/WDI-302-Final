import { useState, useEffect } from 'react';
import React from 'react'
import { useAuth } from '../Hooks/Auth';
import axios from "axios";
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import './Shipping.css'

const Shipping = (props) => {

  const { userURLEndpoint } = props
  const auth = useAuth()
  const [user, setUser] = useState({})

  // console.log(auth)

  const {email, address, city, fName, lName, state, zipCode} = auth.shippingInfo

  const shippingTypes = ['USPS Priority Mail', 'UPS Ground', 'UPS 2nd Day Air', 'UPS Next Day Air']
  const shippingPrices = ['$10.85', '$12.22', '$17.66', '$23.97']

  useEffect(() => {
    axios.get(`${userURLEndpoint}/single-user/${auth.userID}`)
            .then((res) => {
                setUser(res.data.user)
            })
            .catch((err) => {
                // console.log('error: ', err.toString())
            })
  }, [auth])

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
          <Col>{email}</Col>
        </Row>
        <Row className='mt-3'>
          <Col>Ship to:</Col>
          <Col className='change-button'>Change</Col>
        </Row>
        <Row id='shipping-address'>
          <Col>{`${address}, ${city} ${state} ${zipCode}`}</Col>
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
          <Button id='continue-to-payment-button'>Continue to payment</Button>
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