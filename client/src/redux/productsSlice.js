import {createSlice} from '@reduxjs/toolkit'

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [
            
        ]
        //add variable for storing total
    },
    reducers: {
        addProduct: (state, action) => {
            console.log(action.payload)
            state.products.push(action.payload)
        }
        // adding ages (hint method)
    }
})

export const {addProduct} = productsSlice.actions

export default productsSlice.reducer