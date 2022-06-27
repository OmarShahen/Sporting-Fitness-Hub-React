import React, { useState } from 'react'
import './login.css'
import sportingImage from '../../images/sporting.png'
import { adminRequest } from '../../api/request'
import { ThreeDots } from 'react-loader-spinner'



const ResetEmail = () => {

    const [email, setEmail] = useState('')

    const [emailError, setEmailError] = useState('')

    const [submitting, setSubmitting] = useState(false)
    const [isEmailSuccess, setIsEmailSuccess] = useState(false)

    const submit = () => {

        if(!email) {
            return setEmailError('email is required')
        }
        

        setSubmitting(true)
        adminRequest.post(`/auth/reset-mail/${email}`)
        .then(response => {
            setSubmitting(false)
            setIsEmailSuccess(true)
            
            localStorage.setItem('userId', response.data.userId)

        })
        .catch(error => {
            console.error(error)
            setSubmitting(false)
            setEmailError(error.response.data.message)

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
                            { isEmailSuccess ? 
                                <div class="alert alert-success alert-dismissible fade show">
                                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                                <strong>Suucess!</strong> Email Sent Successfully.
                            </div>
                            : null }
                            <div>
                                <p>{emailError}</p>
                                <input type="email" placeholder="Reset Email" onChange={e => {
                                    setEmail(e.target.value)
                                    setEmailError('')
                                    setIsEmailSuccess(false)
                                }} required />
                            </div>
                            <div className="submit-btn-div">
                                { submitting ? 
                                <ThreeDots color="#32CD32" height={30} width={30} />
                                :
                                <input type="submit" value="SEND" onClick={e => {
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

export default ResetEmail