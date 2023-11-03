import './root-layout.css'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { LoginContext } from '../../../context/LoginContext'
import Navbar from "../CommonLayout/Navbar-Container/Navbar/Navbar";
import Footer from "../CommonLayout/Footer-Container/Footer";
import { RegisterContext } from '../../../context/RegisterContext';
function RootLayout() {
    const location = useLocation()
    const path = location.pathname
    const { loginState, loginDispatch } = useContext(LoginContext)
    const { registerState } = useContext(RegisterContext)
    const params = useParams()
    useEffect(() => {
        const persistLoginState = JSON.parse(window.localStorage.getItem('LOGIN_STATE'))
        if (persistLoginState && persistLoginState.fetchedUserData !== null) {
            loginDispatch({
                type: 'PERSIST_USER',
                payload: persistLoginState
            })
        }
    }, [])
    useEffect(() => {
        window.localStorage.setItem('LOGIN_STATE', JSON.stringify(loginState))
    }, [loginState])
    useEffect(() => {
        window.localStorage.setItem('LOGIN_STATE', JSON.stringify(registerState))
    }, [registerState])
    return (
        <div className="outlet-container">
            {
                path === '/login' || path === '/register' || path === '/dashboard' || path === '/logout' || path === '/forgot-password' || path === `/resetPassword/${params.token}`?
                    "" :
                    <div className="top">
                        <Navbar />
                    </div>
            }
            <div className={path === '/login' || path === '/register' || path === '/dashboard' || path === '/logout' || path === '/forgot-password' || path === `/resetPassword/${params.token}` ? "" : "outlet"}>
                <Outlet />
            </div>
            {
                path === '/login' || path === '/register' || path === '/dashboard' || path === '/logout' || path === '/forgot-password' || path === `/resetPassword/${params.token}` ?
                    "" :
                    <div className="bottom">
                        <Footer />
                    </div>
            }
        </div>
    )
}
export default RootLayout