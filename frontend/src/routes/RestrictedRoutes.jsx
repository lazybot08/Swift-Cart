import { useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
import { RegisterContext } from '../context/RegisterContext'
const RestrictedRoute = () => {
    const { loginState } = useContext(LoginContext)
    const {registerState} = useContext(RegisterContext)
    return (
        (loginState.isLoggedIn || registerState.isLoggedIn) ? <Navigate to="/"/> : <Outlet />
    )
}
export default RestrictedRoute