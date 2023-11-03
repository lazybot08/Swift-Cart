const forgotPasswordReducer = (state, action) => {
    switch (action.type) {
        case 'FORGOT_PASSWORD_START':
            return {
                fetchedData: null,
                isFetching: true,
                error: false
            }
        case 'FORGOT_PASSWORD_SUCCESS':
            return {
                fetchedData: action.payload.message,
                isFetching: false,
                error: false
            }
        case 'FORGOT_PASSWORD_FAILURE':
            return {
                fetchedUserData: null,
                isFetching: false,
                error: action.payload.err
            }
        default:
            return state
    }
}
export default forgotPasswordReducer