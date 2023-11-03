import {createContext, useReducer} from 'react'
import loginReducer from '../reducer/loginReducer'

const INITIAL_LOGIN_STATE = {
    fetchedUserData: null,
    isFetching: false,
    isLoggedIn: false,
    error: false
}

export const LoginContext = createContext()

export default function LoginContextProvider({children}){
    const [loginState, loginDispatch] = useReducer(loginReducer, INITIAL_LOGIN_STATE)
    return(
        <LoginContext.Provider value={{loginState, loginDispatch}}>
            {children}
        </LoginContext.Provider>
    )
}