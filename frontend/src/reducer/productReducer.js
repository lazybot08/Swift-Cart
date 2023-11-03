const allProductsReducer = (state, action) => {
    switch (action.type) {
        case 'FETCHING_PRODUCTS':
            return {
                allProductsFetchedData: null,
                isFetching: true,
                error: false
            }
        case 'PRODUCTS_SUCCESS':
            return {
                allProductsFetchedData: action.payload,
                isFetching: false,
                error: false
            }
        case 'PRODUCTS_FAILED':
            return {
                allProductsFetchedData: null,
                isFetching: false,
                error: action.payload
            }
        default:
            return state
    }
}
const productDetailReducer = (state, action) => {
    switch (action.type) {
        case 'FETCHING_PRODUCT':
            return {
                productFetchedData: null,
                isFetching: true,
                error: false
            }
        case 'PRODUCT_SUCCESS':
            return {
                productFetchedData: action.payload,
                isFetching: false,
                error: false
            }
        case 'PRODUCT_FAILED':
            return {
                productFetchedData: null,
                isFetching: false,
                error: action.payload
            }
        default:
            return state
    }
}
export {allProductsReducer, productDetailReducer}