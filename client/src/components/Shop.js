import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ProductCard from './ProductCard'

const Shop = (props) => {

    const {products} = props

    // console.log(props)
    const key = 'name'
    const uniqueProducts = [...new Map(products.map(item =>
        [item[key], item])).values()];

    // console.log(uniqueProducts)


    return (

        <Container>
            <Row className='justify-content-center'>
                {uniqueProducts.map((product, index) => {
                    return  <Col md={4} key={index}>
                                <ProductCard product={product} />
                            </Col>
                })}
            </Row>
        </Container>
    
    )
}

export default Shop