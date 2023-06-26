import React from 'react'
import './ProductCard.css'




const ProductCard = (props) => {

    const changeBackgroundColor = (backgroundColor, id) => {
        // console.log(backgroundColor, id)
        let background = document.getElementById(`${id}`)
        background.style.backgroundColor = backgroundColor
    }

    const { product } = props
    const name = product.name.toLowerCase().replace(' ', '_')

    return (
        <div 
            onMouseEnter={()=> changeBackgroundColor(product.background_color, name)}

            onMouseLeave={() => {
                changeBackgroundColor('#e3ded7', name)
            }}
        >
            <div className='img-container' id={`${name}`}>
                <img src={`${name}.png`}></img>
            </div>
            <div id='bottom-info'>
                <h4>{product.name} <span id='price'>${product.price}</span></h4>
            </div>
        
        </div>
    )
}

export default ProductCard