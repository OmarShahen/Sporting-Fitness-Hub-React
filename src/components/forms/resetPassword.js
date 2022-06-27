import React, { useState } from 'react'
import './login.css'
import sportingImage from '../../images/sporting.png'
import { adminRequest } from '../../api/request'
import { useNavigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'


const ResetPassword = () => {

    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const [submitting, setSubmitting] = useState(false)

    const userId = window.location.pathname.split('/')[2]

    const submit = () => {

        if(!password) {
            return setPasswordError('password is required')
        }

        if(!confirmPassword) {
            return setConfirmPasswordError('confirm password is required')
        }

        if(password !== confirmPassword) {
            return setConfirmPasswordError('confirm password is not the same')
        }

        setSubmitting(true)

        adminRequest.put(`/auth/reset-password/${userId}`, { newPassword: password })
        .then(response => {
            setSubmitting(false)
            navigate('/login')
        })
        .catch(error => {
            setSubmitting(false)
            setPasswordError(error.response.data.message)
            console.error(error)
        })

    }




    return (
        <div>
            <div className="login-form-green-background">    
            </div>
            <div className="login-form">
                <div className="login-form-container">
                    <div className="login-form-header">
                        <img src={sportingImage} alt="sporting club" />
                    </div>
                    <div className="login-form-body">
                        <form>
                            <div>
                                <p>{passwordError}</p>
                                <input type="password" placeholder="New Password" onChange={e => {
                                    setPassword(e.target.value)
                                    setPasswordError('')
                                }} required />
                            </div>
                            <div>
                                <p>{confirmPasswordError}</p>
                                <input type="password" placeholder="Confirm Password" onChange={e => {
                                    setConfirmPassword(e.target.value)
                                    setConfirmPasswordError('')
                                }} required />
                            </div>
                            <div className="submit-btn-div">
                                { submitting ? 
                                <ThreeDots color="#32CD32" height={30} width={30} />
                                :
                                <input type="submit" value="RESET PASSWORD" onClick={e => {
                                    e.preventDefault()
                                    submit()
                                }} />
                            }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword