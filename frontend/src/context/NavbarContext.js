import { createContext, useReducer } from "react"
import navbarReducer from "../reducer/navbarReducer"

const INITIAL_NAVBAR_STATE = {
    navIconState: true,
    dropdownState: {
        value: "All"
    },
    profileOptionsState: false,
    navContainerClassState: "navbar-overlay",
    queryString: {
        keyword: "",
        page: 1,
    },
    profileAvtarState: {
        public_id: "",
        error: false
    }
}

export const NavbarContext = createContext()

export default function NavbarContextProvider({children}){
    const [navbarState, navbarDispatch] = useReducer(navbarReducer, INITIAL_NAVBAR_STATE)
    return(
        <NavbarContext.Provider value={{navbarState, navbarDispatch}}>
            {children}
        </NavbarContext.Provider>
    )
}