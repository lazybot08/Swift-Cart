import {createContext, useReducer} from 'react'
import forgotPasswordReducer from '../reducer/forgotPasswordReducer'

const INITIAL_FORGOT_PASSWORD_STATE = {
    fetchedData: null,
    isFetching: false,
    error: false
}

export const ForgotPasswordContext = createContext()

export default function ForgotPasswordContextProvider({children}){
    const [forgotPasswordState, forgotPasswordDispatch] = useReducer(forgotPasswordReducer, INITIAL_FORGOT_PASSWORD_STATE)
    return(
        <ForgotPasswordContext.Provider value={{forgotPasswordState, forgotPasswordDispatch}}>
            {children}
        </ForgotPasswordContext.Provider>
    )
}