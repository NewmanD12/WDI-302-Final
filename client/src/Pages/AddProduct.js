import React, { useState } from 'react'
import { Container, Row, Col, Form, Button} from 'react-bootstrap'
import './AddProduct.css'
import axios from "axios";


const AddProduct = (props) => {

    const { productURLEndpoint } = props
    const categoryOptions = ['ground', 'whole bean']
    const sizeOptions = ['12oz', '3lb', '5lb']

    const [input, setInput] = useState({})
        
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            "quantity" : parseFloat(input.quantity),
            "price" : parseFloat(input.price)
        })

        axios.post(`${productURLEndpoint}/create-product`, input)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
            .finally(() => {
                window.location.reload(false)
            })
    }

    // console.log(input)

  return (
    <Container className='mt-5' >
        <Row className='justify-content-center'>
            <Col md={6}>
                <Form>
                    <Form.Group className="mb-3" onChange={(e) => handleChange(e)}>
                    <Form.Label>Product Name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter product name" name='name'/>
                    </Form.Group>
            
                    <Form.Group className="mb-3" onChange={(e) => handleChange(e)}>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as='textarea' rows={3} placeholder="Enter product description" name='description'/>
                    </Form.Group>

                    <Form.Group className="mb-3" onChange={(e) => handleChange(e)}>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control type="text" placeholder="Enter product price" name='price'/>
                    <Form.Text className="text-muted">
                    Example: 17.00
                    </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" onChange={(e) => handleChange(e)}>
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control type="text" placeholder="Enter product quantity" name='quantity'/>
                    </Form.Group>

                    <Form.Group className="mb-3" onChange={(e) => handleChange(e)}>
                    <Form.Label>Background Color:</Form.Label>
                    <Form.Control type="text" placeholder="Enter product background color" name='background_color'/>
                    <Form.Text className="text-muted">
                    Enter Hex. Ex. #e5c47c
                    </Form.Text>
                    </Form.Group>

                    <Form.Label>Category:</Form.Label><br/>
                    <Form.Select aria-label="Default select example" id='category-select' onChange={(e) => handleChange(e)} name='category'>
                        <option>Select a category</option>
                        {
                            categoryOptions.map((category, index) => {
                                return <option value={category} key={index}>{category}</option>
                            })
                        }
                    </Form.Select>

                    <Form.Label>Size:</Form.Label><br/>
                    <Form.Select aria-label="Default select example" id='category-select' onChange={(e) => handleChange(e)} name='size'>
                        <option>Select a size</option>
                        {
                            sizeOptions.map((size, index) => {
                                return <option value={size} key={index}>{size}</option>
                            })
                        }
                    </Form.Select>
                    
                    </Form>
                    <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                    Submit
                    </Button>
            </Col>
        </Row>
    </Container>
  )
}

export default AddProduct