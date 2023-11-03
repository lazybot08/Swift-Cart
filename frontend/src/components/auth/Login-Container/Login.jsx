import './login.css'
import CircularProgress from '@mui/material/CircularProgress'
import { useRef, useContext } from 'react'
import { LoginContext } from '../../../context/LoginContext'
import {Link} from 'react-router-dom'
import MODE from '../../../mode'
export default function Login() {
    const { loginState, loginDispatch } = useContext(LoginContext)
    const emailRef = useRef()
    const passwordRef = useRef()
    const submitForm = async (e) => {
        e.preventDefault()
        loginDispatch({ type: 'LOGIN_START' })
        try {
            const rawUserData = await fetch(`${MODE === 'DEVELOPMENT' ?'http://localhost:4000':'https://e-commerce-backend-y30k.onrender.com'}/api/v1/loginUser`, {
                method: 'POST',
                body: JSON.stringify({
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                }),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })
            const parsedUserData = await rawUserData.json()
            if (parsedUserData.success === true) {
                loginDispatch({
                    type: 'LOGIN_SUCCESS', payload: {
                        parsedUserData
                    }
                })
            }
            else if (parsedUserData.success === false) {
                loginDispatch({
                    type: 'LOGIN_FAILURE', payload: {
                        err: parsedUserData.error
                    }
                })
            }
        } catch (error) {
            loginDispatch({
                type: 'LOGIN_FAILURE', payload: {
                    err: error.message
                }
            })
        }
    }
    return (
        <div className="login-container">
            <h1>SwiftCart</h1>
            <form onSubmit={submitForm}>
                <label>
                    Email
                    <input type="text" placeholder='Enter your Email' ref={emailRef} />
                </label>
                <label>
                    Password
                    <input type="password" placeholder='Enter your Password' ref={passwordRef} />
                </label>
                <button type="submit" className='login-button'>{loginState.isFetching ? <CircularProgress size="12px" /> : "Login"}</button>
            </form>
            {loginState.error ? <div className="error">{loginState.error}</div> : ""}
            <Link to='/forgot-password'>Forgot Password?</Link>
            <Link to='/register'>Register New User!</Link>
            <Link to='/'>Go Back to Home</Link>
        </div>
    )
}