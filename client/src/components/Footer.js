import React from 'react'

import { Container, Row, Col, Button } from 'react-bootstrap'
import "./Footer.css"

const Footer = () => {
  return (
    <Container id='footer-container' fluid>
        <Row className='justify-content-center' lg={8}>
            <Col sm={3}>
                <Row>
                    <h4>About</h4>
                </Row>
                <Row>
                    <a href='/about' className='footer-links'>Our Story</a>
                </Row>
                <Row>
                    <a href='#' className='footer-links'>Locations</a>
                </Row>
                <Row>
                    <a href='#' className='footer-links'>Jobs</a>
                </Row>
                <Row>
                    <a href='#' className='footer-links'>FAQ</a>
                </Row>
                <Row>
                    <a href='#' className='footer-links'>Contact</a>
                </Row>
            </Col>
            <Col sm={3}>
                <Row>
                    <h4>Wholesale</h4>
                </Row>
                <Row>
                    <a href='#' className='footer-links'>Serve Our Coffee</a>
                </Row>
                <Row>
                    <a href='#' className='footer-links'>Ordering</a>
                </Row>
            </Col>
            <Col sm={3}>
                <Row>
                    <h4>Learn</h4>
                </Row>
                <Row>
                    <a href='#' className='footer-links'>Brew Guides</a>
                </Row>
                <Row>
                    <a href='#' className='footer-links'>Blog</a>
                </Row>
                <Row>
                    <a href='#' className='footer-links'>Impact</a>
                </Row>
            </Col>
        </Row>
    </Container>
  )
}

export default Footer