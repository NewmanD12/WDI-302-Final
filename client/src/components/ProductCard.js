import React from 'react'
import './ProductCard.css'
import { useNavigate } from 'react-router-dom'




const ProductCard = (props) => {

    const navigate = useNavigate()

    const changeBackgroundColor = (backgroundColor, id) => {
        // console.log(id)
        let background = document.getElementById(`${id}`)
        background.style.backgroundColor = backgroundColor
    }

    const { product } = props
    // console.log(product)
    const name = product.name.toLowerCase().replace(' ', '_')

    return (
        <div 
            onMouseEnter={()=> changeBackgroundColor(product.background_color, name)}

            onMouseLeave={() => {
                changeBackgroundColor('#e3ded7', name)
            }}

            onClick={(e) => {
                navigate(`/individual-product/${product.name}`)
            }}
        >
            <div className='img-container' id={`${name}`}>
                <img src={`/${name}.png`}></img>
            </div>
            <div id='bottom-info'>
                <h4>{product.name}</h4>
                <div id='add-button'>
                    <p>Add To Cart</p><p>+</p>
                </div>
            </div>
        
        </div>
    )
}

export default ProductCard