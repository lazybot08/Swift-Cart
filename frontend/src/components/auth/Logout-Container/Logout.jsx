import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from '../../../context/LoginContext'
import './logout.css'
import MODE from '../../../mode'

function Logout() {
    const [logout_message, setLogoutMessage] = useState("")
    const {loginState, loginDispatch} = useContext(LoginContext)
    useEffect(() => {
        const logout = async () => {
            loginDispatch({
                type: 'LOGOUT_START',
            })
            try {
                const fetchedLogout = await fetch(`${MODE === 'DEVELOPMENT' ?'http://localhost:4000':'https://e-commerce-backend-y30k.onrender.com'}/api/v1/logoutUser`, {
                    method: 'GET',
                    credentials: 'include'
                })
                const jsonfetchedLogout = await fetchedLogout.json()
                setLogoutMessage(jsonfetchedLogout.message)
                loginDispatch({
                    type: 'LOGOUT_SUCCESS'
                })
            } catch (error) {
                loginDispatch({
                    type: 'LOGOUT_FAILURE',
                    payload: {
                        error: error.message
                    }
                })
            }
        }
        logout()
    }, [])
    return (
        <div className='logout-container'>
            {
                loginState.error ? <div className="error">{loginState.error}</div> :
                    <div className='logout'>
                        <h1>{logout_message}</h1>
                        <Link to='/'><button>Go Back To Home</button></Link>
                    </div>
            }
        </div>
    )
}

export default Logout
