const loginReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                fetchedUserData: null,
                isFetching: true,
                isLoggedIn: false,
                error: false
            }
        case 'LOGIN_SUCCESS':
            return {
                fetchedUserData: action.payload.parsedUserData,
                isFetching: false,
                isLoggedIn: true,
                error: false
            }
        case 'LOGIN_FAILURE':
            return {
                fetchedUserData: null,
                isFetching: false,
                isLoggedIn: false,
                error: action.payload.err
            }
        case 'PERSIST_USER':
            return {
                fetchedUserData: action.payload.fetchedUserData,
                isFetching: action.payload.isFetching,
                isLoggedIn: action.payload.isLoggedIn,
                error: action.payload.error
            }
        case 'LOGOUT_START':
            return{
                fetchedUserData: state.fetchedUserData,
                isFetching: true,
                isLoggedIn: state.isLoggedIn,
                error: false
            }
        case 'LOGOUT_SUCCESS':
            return {
                fetchedUserData: null,
                isFetching: false,
                isLoggedIn: false,
                error: false
            }
        case 'LOGOUT_FAILURE':
            return {
                fetchedUserData: state.fetchedUserData,
                isFetching: false,
                isLoggedIn: true,
                error: action.payload.error
            }
        default:
            return state
    }
}
export default loginReducer