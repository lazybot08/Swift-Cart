import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { RegisterContext } from '../../../context/RegisterContext'
import CircularProgress from '@mui/material/CircularProgress'
import './register.css'
import MODE from '../../../mode'
export default function Register() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const {registerState, registerDispatch} = useContext(RegisterContext)
    const submitHandler = async(e)=>{
        e.preventDefault()
        registerDispatch({type: 'REGISTER_START'})
        try{
            const registeredUser = await fetch(`${MODE === 'DEVELOPMENT' ?'http://localhost:4000':'https://e-commerce-backend-y30k.onrender.com'}/api/v1/registerUser`, {
                method: 'POST',
                body: JSON.stringify({
                    name: nameRef.current.value,
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            const jsonRegisterUser = await registeredUser.json()
            if(jsonRegisterUser.success === true){
                registerDispatch({
                    type: 'REGISTER_SUCCESS',
                    payload: jsonRegisterUser
                })
            }
            else if(jsonRegisterUser.success === false){
                registerDispatch({
                    type: 'REGISTER_FAILED',
                    payload: jsonRegisterUser.error
                })
            }
        }catch(error){
            registerDispatch({
                type: 'REGISTER_FAILED',
                payload: error.message
            })
        }
    }
    return (
        <div className="register-container">
            <h1>SwiftCart</h1>
            <form onSubmit={submitHandler}>
                <label>
                    Name
                    <input type="text" placeholder='Enter your Name' ref={nameRef}/>
                </label>
                <label>
                    Email
                    <input type="text" placeholder='Enter your Email ID' ref={emailRef}/>
                </label>
                <label>
                    Password
                    <input type="password" placeholder='Enter your Password' ref={passwordRef}/>
                </label>
                <button type="submit" className='register-button'>{registerState.isFetching ? <CircularProgress size="12px" /> : "Register"}</button>
            </form>
            {registerState.error? <div className="error-message">{registerState.error}</div>: ""}
            <Link to='/login'>Login here</Link>
            <Link to='/'>Go Back to Home</Link>
        </div>
    )
}