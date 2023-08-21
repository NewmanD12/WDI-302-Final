import React, { useState, useEffect } from 'react'
import { useAuth } from '../Hooks/Auth';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './Payment.css'

const Payment = (props) => {
    const auth = useAuth()
    const navigate = useNavigate()

    const { checkoutInfo } = props
    
    const {email, address, city, fName, lName, state, zipCode, selectedShipping, shippingPrice} = auth.shippingInfo
    console.log(auth)

    const [input, setInput] = useState({})

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    const handleSubmit = () => {
        alert("Your payment has been processed")
        navigate('/')
    }

    return (
        <Container>
            <Row className='mt-5'>
                <Col>
                    <a href='/cart' className="pagination-options">Cart</a><span> → </span>
                    <a href='/shipping-info' className="pagination-options">Information</a><span> → </span>
                    <a href='/shipping' className="pagination-options">Shipping</a><span> → </span>
                    <a className="pagination-options">Payment</a>
                </Col>
            </Row>
            <Row>
                <Container id='contact-container' className='mt-5'>
                    <Row>
                        <Col id='contact'>Contact</Col>
                        <Col className='change-button'>Change</Col>
                    </Row>
                    <Row id='payment-shipping-email'>
                        <Col>{email}</Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>Ship to:</Col>
                        <Col className='change-button'>Change</Col>
                    </Row>
                    <Row id='payment-shipping-address'>
                        {address && <Col>{`${address}, ${city} ${state} ${zipCode}`}</Col>}
                    </Row>
                    <Row className='mt-3'>
                        <Col>Method:</Col>
                        <Col className='change-button'>Change</Col>
                    </Row>
                    <Row id='shipping-address'>
                        {checkoutInfo.selectedShipping ? <Col>{`${checkoutInfo.selectedShipping} - ${checkoutInfo.shippingPrice}`}</Col>
                        : 
                        (selectedShipping ? <Col>{`${selectedShipping} - ${shippingPrice}`}</Col>
                        :
                        ''
                        )
                        }
                    </Row>
                </Container>
            </Row>
            <Row className='mt-4'>
                <Col md={6}>
                    <h4>Gift card or discount code</h4>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col md={8}>
                    <Form>
                        <Form.Group className="mt-2" onChange={(e) => handleChange(e)}>
                        <Form.Control type="text" placeholder="promo-code" name='promo-code'/>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col>
                    <h4>Payment</h4>
                    <p>All transactions are secure and encrypted.</p>
                </Col>
            </Row>
            <Row>
                <Container id='payment-form-container'>
                    <Row>
                        <Col>
                            <Form>
                            
                                <Form.Group className="mt-2" onChange={(e) => handleChange(e)}>
                                <Form.Control type="text" placeholder="Card Number" name='card-number'/>
                                </Form.Group>

                                <Form.Group className="mt-2" onChange={(e) => handleChange(e)}>
                                <Form.Control type="text" placeholder="Name on card" name='name-on-card'/>
                                </Form.Group>

                                <Form.Group className="mt-2" onChange={(e) => handleChange(e)}>
                                <Form.Control type="text" placeholder="Expiration Date (MM/YY)" name='card-number'/>
                                </Form.Group>

                                <Form.Group className="mt-2" onChange={(e) => handleChange(e)}>
                                <Form.Control type="text" placeholder="Security Code" name='security-code'/>
                                </Form.Group>

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Row>
            <Row>
                <Col md={6}>
                    <Button id='continue-to-payment-button' onClick={() => handleSubmit()}>Pay Now</Button>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <a href='/shipping' id='return-to-shipping'>← Return to shipping</a>
                </Col>
            </Row>
        </Container>
    )
}

export default Payment