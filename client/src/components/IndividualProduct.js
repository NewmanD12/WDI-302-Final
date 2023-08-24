import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import './IndividualProduct.css'
import Form from 'react-bootstrap/Form';
import {useAuth} from '../Hooks/Auth'
import axios from "axios";


const IndividualProduct = (props) => {

    const { products, userURLEndpoint } = props
    const { name } = useParams()
    const [category, setCategory] = useState('')
    const [sizeOptions, setSizeOptions] = useState([])
    const [size, setSize] = useState('')
    const [quantity, setQuantity] = useState(1)
    const singleProduct = products.filter((product) => product.name === name)[0]
    const [possibleTotal, setPossibleTotal] = useState(0)
    const auth = useAuth()
    const navigate = useNavigate()
    // console.log(userURLEndpoint)
    
    useEffect(() => {
        window.scrollTo(0,0);
    }, [])
    
    let backgroundColor = ''
    let description = ''
    let categoryOptions = []
    if(singleProduct){
        backgroundColor = singleProduct.background_color
        description = singleProduct.description
        categoryOptions = [...new Set(singleProduct.productBreakdown.map(item => item.category))]; 
    }
    // console.log(backgroundColor)

    const findSizeOptions = (category) => {
        const prodOptions = singleProduct.productBreakdown.filter((prod) => prod.category === category)
        // console.log(prodOptions)
        setSizeOptions([...new Set(prodOptions.map(item => item.size))])
    }

    // console.log(sizeOptions)

    const calculateTotal = (size) => {
        const product = singleProduct.productBreakdown.filter((prod) => prod.category === category && prod.size === size)[0]
        // console.log(product.price)
        setPossibleTotal(product.price)
    }

    const handleAddToCart = () => {
        // console.log(name, category, size, quantity, auth.userID)
        // console.log(`${userURLEndpoint}/add-to-cart`)
        axios.post(`${userURLEndpoint}/add-to-cart`, {
            name, 
            category, 
            size,
            quantity,
            price : possibleTotal,
            "userID" : auth.userID
        })
        .then((res) => console.log('success'))
        .catch((err) => console.log(err))
        .finally(() => navigate('/cart'))
        
    }

    let loweredName = name.toLowerCase().replace(' ', '_')

    return (
        <div id='body-wrapper' style={{backgroundColor : backgroundColor}}>
            <Container fluid>
                <Row className='justify-content-center'>
                    <Col lg={6} className='mt-3' id='img-holder'>
                        <img src={`/${loweredName}.png`}
                        id='single-imgs'
                    />
                    </Col>
                    <Col md={6} id='prod-info'>
                        <Row className='m-2'>
                            <Col className='mt-3' sm={11} id='info-wrapper'>
                                <h1 className='mt-3'>{name}</h1>
                                {possibleTotal > 0 && <p className='mt-2'>${possibleTotal}/each</p>}
                                <p className='mt-5'>{description}</p>
                                <h6 className='mt-5'>Grind</h6>
                                <Form id='category-form' >
                                    <Form.Select onChange={(e) => {
                                        setCategory(e.target.value)
                                        findSizeOptions(e.target.value)
                                    }}>
                                    <option value=''>Select Category</option>
                                    {
                                        categoryOptions.map((category, index) => {
                                            return  <option key={index} value={category}>
                                                        {category}
                                                    </option>
                                        })
                                    }
                                    
                                    </Form.Select>
                                </Form>
                                {
                                    sizeOptions.length > 0 &&     <div>
                                                        <h6>Size</h6>
                                                        <Form id='size-form'>
                                                            <Form.Select onChange={(e) => {
                                                                setSize(e.target.value)
                                                                calculateTotal(e.target.value)
                                                            }}>
                                                            <option value=''>Select Size</option>
                                                            {
                                                                sizeOptions.map((size, index) => {
                                                                    return  <option key={index} value={size}>
                                                                                {size}
                                                                            </option>
                                                                })
                                                            }
                                                            
                                                            </Form.Select>
                                                        </Form>
                                                    </div>
                                }
                                {
                                    size && <div id='quantity-div'>
                                                <h6>Quantity</h6>
                                                <div id='quantity-bar'>
                                                    <p id='minus-button' onClick={() => {
                                                        if(quantity > 1){
                                                            const newCount = quantity - 1
                                                            setQuantity(newCount)
                                                        }
                                                    }}>-</p>
                                                    <p id='quantity'>{quantity}</p>
                                                    <p id='plus-button' onClick={() => {
                                                        const newCount = quantity + 1
                                                        setQuantity(newCount)
                                                    }}>+</p>
                                                </div>
                                            </div>
                                }
                                
                            </Col>
                            { size && category && 
                                <Col>
                                    <div id='add-to-cart-wrapper'>
                                        <button id='add-to-cart-button' onClick={() => handleAddToCart()}>Add To Cart</button>
                                    </div>
                                </Col>

                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default IndividualProduct