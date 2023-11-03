import { createContext, useReducer } from "react"
import {allProductsReducer, productDetailReducer} from "../reducer/productReducer"

const ALL_PRODUCTS_INITIAL_STATE = {
    allProductsFetchedData: null,
    isFetching: false,
    error: false
}
const PRODUCT_DETAIL_INITIAL_STATE = {
    productFetchedData: null,
    isFetching: false,
    error: false
}

export const AllProductsContext = createContext()
export const ProductDetailContext = createContext()

const AllProductsContextProvider = ({children})=>{
    const [allProducts, dispatch] = useReducer(allProductsReducer, ALL_PRODUCTS_INITIAL_STATE)
    return(
        <AllProductsContext.Provider value={{allProducts, dispatch}}>
            {children}
        </AllProductsContext.Provider>
    )
}
const ProductDetailContextProvider = ({children})=>{
    const [productDetail, dispatch] = useReducer(productDetailReducer, PRODUCT_DETAIL_INITIAL_STATE)
    return(
        <ProductDetailContext.Provider value={{productDetail, dispatch}}>
            {children}
        </ProductDetailContext.Provider>
    )
}

export {AllProductsContextProvider, ProductDetailContextProvider}