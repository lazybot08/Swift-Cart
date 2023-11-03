import { Alert } from '@mui/material'
import './error.css'

function AlertError({ error }) {
    return (
        <div className="error">
            <Alert severity="error">{error}</Alert>
        </div>
    )
}

export default AlertError
