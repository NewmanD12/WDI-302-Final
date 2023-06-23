import React from 'react'
import ResponsiveAppBar from './ResponsiveAppBar'
import { Outlet } from 'react-router-dom'
import './Layout.css'

const promos = ['Free shipping for orders $40 and over!', 'Get 30% your first subscription shipment with code: save30', "Our roasters and our customer support will be closed on July 4th. "]


const Layout = () => {
    return (
        <>
            <div id='top-menu'>
                <div id='top-promos'>
                    {promos.map((promo, index) => {
                        return <p key={index} >{promo}</p>
                    })}
                </div>
                <ResponsiveAppBar /> 
                <Outlet /> 
            </div>
        </>
    )
}

export default Layout