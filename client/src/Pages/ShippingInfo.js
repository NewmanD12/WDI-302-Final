import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import axios from "axios";
import { useAuth } from '../Hooks/Auth';
import { useNavigate } from 'react-router-dom';
import './ShippingInfo.css'


const ShippingInfo = (props) => {

  const { userURLEndpoint, checkoutInfo, setCheckoutInfo } = props
  const navigate = useNavigate()

  const auth = useAuth()
  const [user, setUser] = useState({})
  const [total, setTotal] = useState(-1)
  const [showingCart, setShowingCart] = useState(false)
  const states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ]

  const [input, setInput] = useState({})
  const handleChange = (e) => {
      setInput({
          ...input,
          [e.target.name]: e.target.value
      })
  }

  // console.log(shippingInfoInput)

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  // console.log(auth)

  useEffect(() => {
    if(auth.userID){
      axios.get(`${userURLEndpoint}/single-user/${auth.userID}`)
              .then((res) => {
                  setUser(res.data.user)
              })
              .catch((err) => {
                  // console.log('error: ', err.toString())
              })
    }
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

  // console.log(cart)

  return (
    <Container>
      <Row className='justify-content-between mt-5' id='cart-summary-banner'>
        <Col xs={6}>Show order summary ⌵</Col>
        <Col xs={3} id='total'>${total}</Col>
      </Row>
      
      {showingCart && cart && <Container id='cart-summary-container'>
                                {cart.map((item, index) => {
                                  return  <Row key={index}>
                                            <Col>{item.productName}</Col>
                                            <Col></Col>
                                          </Row>
                                })}
                              </Container>
      }

      <Row className='mt-5'>
        <Col>
          <a href='/cart' className="pagination-options">Cart</a><span> → </span>
          <a href='/shipping-info' className="pagination-options">Information</a><span> → </span>
          <a href='/shipping' className="pagination-options">Shipping</a><span> → </span>
          <a className="pagination-options">Payment</a>
        </Col>
      </Row>

      <Row className='mt-4'>
        <Col>
          <h4>Contact</h4>
        </Col>
        <Col>
          {
            auth.token && <p>Already have an account?<a href='/login'>Log in</a></p>
          }
        </Col>
      </Row>
      <Row>
          <Col>
            <Form>
              <Form.Group className="mt-2" onChange={(e) => handleChange(e)}>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="text" placeholder="email" name='email'/>
                <Form.Text className="text-muted">
                We do not store your email address.
                </Form.Text>
              </Form.Group>
            </Form>
          </Col>
      </Row>
      <Row className='mt-3'>
          <Col>
            <Form>
              <h4>Shipping</h4>
              <Form.Group className="mt-4" onChange={(e) => handleChange(e)}>
                <Form.Label>First Name:</Form.Label>
                <Form.Control type="text" placeholder="First Name" name='fName'/>
              </Form.Group>
              
              <Form.Group className="mt-4" onChange={(e) => handleChange(e)}>
                <Form.Label>Last Name:</Form.Label>
                <Form.Control type="text" placeholder="Last Name" name='lName'/>
              </Form.Group>
              
              <Form.Group className="mt-4" onChange={(e) => handleChange(e)}>
                <Form.Label>Address:</Form.Label>
                <Form.Control type="text" placeholder="Address" name='address'/>
              </Form.Group>
              
              <Form.Group className="mt-4" onChange={(e) => handleChange(e)}>
                <Form.Control type="text" placeholder="Apartment, suite, etc. (optional)" name='address2'/>
              </Form.Group> 

              <Form.Group className="mt-4" onChange={(e) => handleChange(e)}>
                <Form.Label>City:</Form.Label>
                <Form.Control type="text" placeholder="City" name='city'/>
              </Form.Group>
               
              <Form.Label className='mt-4'>State:</Form.Label><br/>
              <Form.Select aria-label="Default select example" id='state-select' onChange={(e) => handleChange(e)} name='state'>
                  <option>Select a state</option>
                  {
                      states.map((state, index) => {
                          return <option value={state} key={index}>{state}</option>
                      })
                  }
              </Form.Select>

              <Form.Group className="mt-4" onChange={(e) => handleChange(e)}>
                <Form.Label>Zip Code:</Form.Label>
                <Form.Control type="text" placeholder="Zip Code" name='zipCode'/>
              </Form.Group>

              <Form.Group className="mt-4" onChange={(e) => handleChange(e)}>
                <Form.Label>Phone Number:</Form.Label>
                <Form.Control type="text" placeholder="Phone Number (optional)" name='phoneNumber'/>
              </Form.Group>              
            </Form>
            <Row className='mt-4' id='submit-row'>
              <Col className='mt-4'>
                <a href='/cart' id='return-to-cart'>← Return to cart</a>
              </Col>
              <Col sm={6}>
                <Button variant="primary" id='shipping-submit' onClick={async (e) => {
                  e.preventDefault()
                  // console.log(input)
                  const addedResult = await auth.addShippingInfo(input, auth)

                  if(addedResult){
                    setCheckoutInfo(input)
                    navigate('/shipping')
                  }
                }}>
                  Continue to shipping
                </Button>
              </Col>
            </Row>
            
          </Col>
      </Row>
    </Container>
  )
}

export default ShippingInfo