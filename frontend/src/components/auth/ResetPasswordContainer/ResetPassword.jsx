import { useContext, useRef } from 'react'
import './reset-password.css'
import { CircularProgress } from '@mui/material'
import MODE from '../../../mode'
import { ResetPasswordContext } from '../../../context/ResetPasswordContext'
import { Link, useParams } from 'react-router-dom'

function ResetPassword() {
    const newPasswordRef = useRef()
    const confirmNewPasswordRef = useRef()
    const params = useParams()
    const { resetPasswordState, resetPasswordDispatch } = useContext(ResetPasswordContext)
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            resetPasswordDispatch({
                type: 'RESET_PASSWORD_START'
            })
            const fetchedResetUser = await fetch(`${MODE === 'DEVELOPMENT' ?'http://localhost:4000':'https://e-commerce-backend-y30k.onrender.com'}/api/v1/password/resetPassword/${params.token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newPassword: newPasswordRef.current.value,
                    confirmNewPassword: confirmNewPasswordRef.current.value
                })
            })
            const jsonResetUser = await fetchedResetUser.json()
            if(jsonResetUser.success){
                resetPasswordDispatch({
                    type: 'RESET_PASSWORD_SUCCESS',
                    payload: {
                        user: fetchedResetUser
                    }
                })
            }else{
                resetPasswordDispatch({
                    type: 'RESET_PASSWORD_FAILURE',
                    payload: {
                        err: jsonResetUser.error
                    }
                })
            }
        }catch(error){
            resetPasswordDispatch({
                type: 'RESET_PASSWORD_FAILURE',
                payload: {
                    err: error
                }
            })
        }
    }
    return (
        <div className="reset-password-container">
            <h1>SwiftCart</h1>
            <form onSubmit={submitHandler}>
                <label>
                    New Password
                    <input type="text" placeholder='Enter your New Password' ref={newPasswordRef} />
                </label>
                <label>
                    Confirm New Password
                    <input type="text" placeholder='Enter your Confirm New Password' ref={confirmNewPasswordRef} />
                </label>
                <button type="submit" className='reset-password-button'>{resetPasswordState.isFetching ? <CircularProgress size="12px" /> : "Reset Password"}</button>
            </form>
            {resetPasswordState.fetchedData ? <div className='confirmation-message'>Password Reset successfully. Click to <Link to='/login'>Login</Link></div>: ""}
            {resetPasswordState.error ? <div className="error-message">{resetPasswordState.error}</div> : ""}
        </div>
    )
}

export default ResetPassword
