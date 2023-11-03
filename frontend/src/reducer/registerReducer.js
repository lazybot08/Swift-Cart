const registerReducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER_START':
            return {
                fetchedUserData: null,
                isFetching: true,
                isLoggedIn: false,
                error: false
            }
        case 'REGISTER_SUCCESS':
            return {
                fetchedUserData: action.payload,
                isFetching: false,
                isLoggedIn: true,
                error: false
            }
        case 'REGISTER_FAILED':
            return {
                fetchedUserData: null,
                isFetching: false,
                isLoggedIn: false,
                error: action.payload
            }
        default:
            return state
    }
}
export default registerReducer