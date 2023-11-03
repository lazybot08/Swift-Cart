import { useContext, useRef } from 'react'
import './forgot-password.css'
import { ForgotPasswordContext } from '../../../context/ForgotPasswordContext'
import { CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import MODE from '../../../mode'

function ForgotPassword() {
    const emailRef = useRef()
    const { forgotPasswordState, forgotPasswordDispatch } = useContext(ForgotPasswordContext)
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            forgotPasswordDispatch({
                type: 'FORGOT_PASSWORD_START'
            })
            const fetchedForgotPassword = await fetch(`${MODE === 'DEVELOPMENT' ?'http://localhost:4000':'https://e-commerce-backend-y30k.onrender.com'}/api/v1/password/forgotPassword`, {
                method: 'POST',
                body: JSON.stringify({
                    email: emailRef.current.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const jsonForgotPassword = await fetchedForgotPassword.json()
            if(jsonForgotPassword.success){
                forgotPasswordDispatch({
                    type: 'FORGOT_PASSWORD_SUCCESS',
                    payload: {
                        message: jsonForgotPassword.message
                    }
                })
            }else{
                forgotPasswordDispatch({
                    type: 'FORGOT_PASSWORD_FAILURE',
                    payload: {
                        err: jsonForgotPassword.error
                    }
                })
            }
        } catch (error) {
            forgotPasswordDispatch({
                type: 'FORGOT_PASSWORD_FAILURE',
                payload: {
                    err: error
                }
            })
        }
    }
    return (
        <div className='forgot-password-container'>
            <h1>SwiftCart</h1>
            <form onSubmit={submitHandler}>
                <label>
                    Email
                    <input type="text" placeholder='Enter your Email ID' ref={emailRef} />
                </label>
                <button type="submit" className='forgot-password-button'>{forgotPasswordState.isFetching ? <CircularProgress size="12px" /> : "Submit"}</button>
            </form>
            {forgotPasswordState.fetchedData ? <div className='confirmation-message'>{forgotPasswordState.fetchedData}</div>: ""}
            {forgotPasswordState.error ? <div className="error-message">{forgotPasswordState.error}</div> : ""}
            <Link to='/login'>Login here</Link>
            <Link to='/'>Go Back to Home</Link>
        </div>
    )
}

export default ForgotPassword
