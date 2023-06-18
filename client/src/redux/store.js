import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './productsSlice'
//import slices here as reducer

export default configureStore({
    reducer: {
        products: productsSlice
    }
})