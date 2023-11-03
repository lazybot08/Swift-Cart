import { useEffect, useRef, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import './dashboard.css'
import CloudinaryImg from '../../utils/Cloudinary Image/CloudinaryImg';
import MODE from '../../../mode';
export default function Dashboard() {
    const profileNameRef = useRef()
    const profileEmailRef = useRef()
    const [file, setFile] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [profile, setProfile] = useState('')
    const [isNameDisabled, setNameEnable] = useState(true)
    const [isEmailDisabled, seEmailEnable] = useState(true)
    const [error, setError] = useState('')
    function readFile() {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setProfileImage('')
            setPreviewImage(reader.result)
        }
    }
    const changeHandler = (e) => {
        const file = e.target.files[0]
        setFile(file)
    }
    useEffect(() => {
        if (file) {
            readFile()
        }
    }, [file])

    const nameEditHandler = () => {
        setNameEnable(!isNameDisabled)
        seEmailEnable(true)
    }
    const emailEditHandler = () => {
        seEmailEnable(!isEmailDisabled)
        setNameEnable(true)
    }
    useEffect(() => {
        if (isNameDisabled === false) {
            profileNameRef.current.focus()
        }
        if (isEmailDisabled === false) {
            profileEmailRef.current.focus()
        }
    }, [isNameDisabled, isEmailDisabled])

    const nameChangeHandler = (e) => {
        profileNameRef.current.value = e.target.value
    }
    const emailChangeHandler = (e) => {
        profileEmailRef.current.value = e.target.value
    }

    useEffect(() => {
        const fetchProfileData = async () => {
            const fetchedProfile = await fetch(`${MODE === 'DEVELOPMENT' ?'http://localhost:4000':'https://e-commerce-backend-y30k.onrender.com'}/api/v1/profile`, {
                credentials: 'include'
            })
            const jsonProfileData = await fetchedProfile.json()
            setProfile(jsonProfileData.user)
            const fetchedProfileImage = await fetch(`${MODE === 'DEVELOPMENT' ?'http://localhost:4000':'https://e-commerce-backend-y30k.onrender.com'}/api/v1/profile/getProfileImage`, {
                method: 'GET',
                credentials: 'include'
            })
            const jsonProfileImage = await fetchedProfileImage.json()
            if(jsonProfileImage.success === true){
                setProfileImage(jsonProfileImage.avtar.public_id)
            }else{
                setProfileImage('')
            }
        }
        fetchProfileData()
    }, [])

    useEffect(() => {
        profileNameRef.current.value = profile.name
        profileEmailRef.current.value = profile.email
    }, [profile])


    const updateProfile = async () => {
        if (previewImage !== '') {
            const updatedAvatarFetched = await fetch(`${MODE === 'DEVELOPMENT' ?'http://localhost:4000':'https://e-commerce-backend-y30k.onrender.com'}/api/v1/profile/uploadAvatar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image: previewImage
                }),
                credentials: 'include'
            })
            try {
                const jsonUpdatedAvatar = await updatedAvatarFetched.json()
                setPreviewImage('')
                setProfileImage(jsonUpdatedAvatar.avtar.public_id)
            } catch (error) {
                console.log(error)
            }
        }
        const updatedProfile = await fetch(`${MODE === 'DEVELOPMENT' ?'http://localhost:4000':'https://e-commerce-backend-y30k.onrender.com'}/api/v1/profile/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: profileNameRef.current.value,
                email: profileEmailRef.current.value
            }),
            credentials: 'include'
        })
        try {
            const updatedProfileJSON = await updatedProfile.json()
            if (updatedProfileJSON.success === true) {
                setProfile(updatedProfileJSON.user)
                setError('')
            }
            else if (updatedProfileJSON.success === false) {
                setError(updatedProfileJSON.error)
            }
        } catch (error) {
            setError(error)
        }
    }


    return (
        <div className="dashboard-container">
            <div className="dashboard-top">
                <h1>Welcome to Dashboard</h1>
            </div>
            <div className="basic-info-container">
                <div className="image-upload">
                    <div className="image-preview">
                        {profileImage ? <CloudinaryImg public_id={profileImage}/> : <img src={previewImage} alt='not loading' />}
                    </div>
                    <label htmlFor="choose-file-button" className='custom-choose-file-button'>
                        Choose File
                    </label>
                    <input type="file" id='choose-file-button' onChange={changeHandler} accept=".png, .jpg, .jpeg" />
                </div>
                <div className="profile-basic-info">
                    <label htmlFor="name">
                        Name -
                        <input type="text" disabled={isNameDisabled} onChange={nameChangeHandler} ref={profileNameRef} />
                        <EditIcon onClick={nameEditHandler} cursor='pointer' />
                    </label>
                    <label htmlFor="email">
                        Email -
                        <input type="text" disabled={isEmailDisabled} onChange={emailChangeHandler} ref={profileEmailRef} />
                        <EditIcon onClick={emailEditHandler} cursor='pointer' />
                    </label>
                    <button onClick={updateProfile}>Save Profile</button>
                    <div className="error">{error}</div>
                </div>

            </div>
        </div>
    )
}
