import React,{ useState }  from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './CartProduct.css'


const CartProduct = (props) => {


    const {productName, category, size, quantity, price} = props.product
    // console.log(productName, category, size, quantity)

    let imgSrc = ''
    // console.log(props.product)
    // // const imgSrc = productName.toLowerCase().replace(" ", '_')
    // console.log(productName)
    if(productName){
        imgSrc = productName.toLowerCase().replace(" ", '_')
    }

    return (
        <Container className='m-3'>
            <Row>
                <Col sm={4}>
                    <img src={`${imgSrc}.png`}/>
                </Col>
                <Col sm={8} id='cart-prod-info'>
                    <h3>{productName}</h3>
                    <p>Sub-Total: ${quantity * price}</p>
                    <p>{size}</p>
                    <div id='cart-card-quantity'>
                        <p id='minus-button'>-</p>
                        <p id='quantity'>{quantity}</p>
                        <p id='plus-button'>+</p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default CartProduct