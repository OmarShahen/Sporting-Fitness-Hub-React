import React, { useState } from 'react'
import './form.css'
import BadgeIcon from '@mui/icons-material/Badge'
import { adminRequest } from '../../api/request'
import { ThreeDots } from 'react-loader-spinner'



const UserForm = ({ closeForm }) => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phone, setPhone] = useState('')

    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [phoneError, setPhoneError] = useState('')

    const [loading, setLoading] = useState(false)

    const submit = () => {

        if(!username) {
            return setUsernameError('username is required')
        }

        if(!email) {
            return setEmailError('email is required')
        }

        if(!password) {
            return setPasswordError('password is required')
        }

        if(!confirmPassword) {
            return setConfirmPasswordError('password is required')
        }

        if(confirmPassword !== password) {
            return setConfirmPasswordError('different password')
        }

        if(!phone) {
            return setPhoneError('phone is required')
        }

        const userData = { username, email, password, phone }

        setLoading(true)

        adminRequest.post('/users', userData)
        .then(response => {

            setUsername('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setPhone('')

            setLoading(false)
            closeForm()
        })
        .catch(error => {
            
            setLoading(false) 

            const errorData = error.response.data

            if(errorData.field === 'username') {
                return setUsernameError(errorData.message)
            } 
            
            if(errorData.field === 'email') {
                return setEmailError(errorData.message)
            }

            if(errorData.field === 'password') {
                return setPasswordError(errorData.message)
            }

            if(errorData.field === 'phone') {
                return setPhoneError(errorData.message)
            }
        })
    }


    return (
        <div className="modal-container">
            <div className="modal-wrapper">
                <div className="modal-header">
                    <div>
                        <BadgeIcon style={{ width: '4rem', height: '4rem', marginBottom: '.2rem' }} />
                    </div>
                </div>
                    <form>
                        <div>
                            <p>{usernameError}</p>
                            <input type="text" placeholder="username" value={username} onChange={e => {
                                setUsername(e.target.value)
                                setUsernameError('')
                            }} />
                        </div>
                        <div>
                            <p>{emailError}</p>
                            <input type="email" placeholder="email" value={email} onChange={e => {
                                setEmail(e.target.value)
                                setEmailError('')
                            }} />
                        </div>
                        <div>
                            <p>{passwordError}</p>
                            <input type="password" placeholder="password" value={password} onChange={e => {
                                setPassword(e.target.value)
                                setPasswordError('')
                            }} />
                        </div>
                        <div>
                            <p>{confirmPasswordError}</p>
                            <input type="password" placeholder="confirm password" value={confirmPassword} onChange={e => {
                                setConfirmPassword(e.target.value)
                                setConfirmPasswordError('')
                            }} />
                        </div>
                        <div>
                            <p>{phoneError}</p>
                            <input type="text" placeholder="phone" value={phone} onChange={e => {
                                setPhone(e.target.value)
                                setPhoneError('')
                            }} />
                        </div>
                        <div className="form-btns">
                            <button className="submit-btn" onClick={e => {
                                e.preventDefault()
                                submit()
                            }}>
                                { loading ? <ThreeDots color="white" height={20} width={20} /> : 'SUBMIT' }
                            </button>
                            <button className="cancel-btn bg-danger text-white" onClick={e => {
                                e.preventDefault()
                                closeForm()
                            }}>
                                CANCEL
                            </button>
                        </div>
                    </form>
            </div>
        </div>
    )
}

export default UserForm