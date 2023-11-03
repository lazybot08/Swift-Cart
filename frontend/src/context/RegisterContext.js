import { createContext, useReducer } from "react";
import registerReducer from "../reducer/registerReducer";

const INITIAL_REGISTER_STATE = {
    fetchedUserData: null,
    isFetching: false,
    isLoggedIn: false,
    error: false
}

export const RegisterContext = createContext()

export default function RegisterContextProvider({ children }) {
    const [registerState, registerDispatch] = useReducer(registerReducer, INITIAL_REGISTER_STATE)
    return (
        <RegisterContext.Provider value={{ registerState, registerDispatch }}>
            {children}
        </RegisterContext.Provider>
    )
}