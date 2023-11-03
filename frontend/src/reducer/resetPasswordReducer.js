const resetPasswordReducer = (state, action) => {
    switch (action.type) {
        case 'RESET_PASSWORD_START':
            return {
                fetchedData: null,
                isFetching: true,
                error: false
            }
        case 'RESET_PASSWORD_SUCCESS':
            return {
                fetchedData: action.payload.user,
                isFetching: false,
                error: false
            }
        case 'RESET_PASSWORD_FAILURE':
            return {
                fetchedUserData: null,
                isFetching: false,
                error: action.payload.err
            }
        default:
            return state
    }
}
export default resetPasswordReducer