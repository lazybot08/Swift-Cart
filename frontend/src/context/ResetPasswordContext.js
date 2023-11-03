import {createContext, useReducer} from 'react'
import resetPasswordReducer from '../reducer/resetPasswordReducer'

const INITIAL_RESET_PASSWORD_STATE = {
    fetchedData: null,
    isFetching: false,
    error: false
}

export const ResetPasswordContext = createContext()

export default function ResetPasswordContextProvider({children}){
    const [resetPasswordState, resetPasswordDispatch] = useReducer(resetPasswordReducer, INITIAL_RESET_PASSWORD_STATE)
    return(
        <ResetPasswordContext.Provider value={{resetPasswordState, resetPasswordDispatch}}>
            {children}
        </ResetPasswordContext.Provider>
    )
}