import { useContext, useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { LoginContext } from "../context/LoginContext"
import { RegisterContext } from "../context/RegisterContext"

const PrivateRoute = () => {
    const { loginState } = useContext(LoginContext)
    const { registerState } = useContext(RegisterContext)
    return (
        (loginState.isLoggedIn || registerState.isLoggedIn) ? <Outlet /> : <Navigate to='/' />
    )
}
export default PrivateRoute