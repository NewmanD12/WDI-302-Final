import React from 'react'

import { Container, Row, Col, Button } from 'react-bootstrap'
import "./Footer.css"

const Footer = () => {
  return (
    <Container id='footer-container'>
        <Row className='justify-content-center'>
            <Col sm={3}>
                <h4>About</h4>
                <p>Our Story</p>
                <p>Locations</p>
                <p>Jobs</p>
                <p>FAQ</p>
                <p>Contact</p>
            </Col>
            <Col sm={3}>
                <h4>Wholesale</h4>
                <p>Serve Our Coffee</p>
                <p>Ordering</p>
            </Col>
            <Col sm={3}>
                <h4>Learn</h4>
                <p>Brew Guides</p>
                <p>Blog</p>
                <p>Impact</p>
            </Col>
        </Row>
    </Container>
  )
}

export default Footer