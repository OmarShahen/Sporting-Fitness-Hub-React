import React, { useState } from 'react'
import './login.css'
import sportingImage from '../../images/sporting.png'
import { adminRequest } from '../../api/request'
import { useNavigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import { NavLink } from 'react-router-dom'


const LoginForm = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [submitting, setSubmitting] = useState(false)

    const submit = () => {

        if(!email) {
            return setEmailError('email is required')
        }

        if(!password) {
            return setPasswordError('password is required')
        }

        const userLogin = { email, password }

        setSubmitting(true)

        adminRequest.post('/auth/admins/login', userLogin)
        .then(response => {

            const adminData = JSON.stringify(response.data.user)
            const accessToken = JSON.stringify(response.data.accessToken)

            localStorage.setItem('admin', adminData)
            localStorage.setItem('accessToken', accessToken)
            setSubmitting(false)

            navigate('/members-packages')

        })
        .catch(error => {
            const field = error.response.data.field
            setSubmitting(false)

            if(field === 'email') {
                return setEmailError(error.response.data.message)
            }

            if(field === 'password') {
                return setPasswordError(error.response.data.message)
            }
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
                                <p>{emailError}</p>
                                <input type="email" placeholder="Email" onChange={e => {
                                    setEmail(e.target.value)
                                    setEmailError('')
                                }} required />
                            </div>
                            <div>
                                <p>{passwordError}</p>
                                <input type="password" placeholder="Password" onChange={e => {
                                    setPassword(e.target.value)
                                    setPasswordError('')
                                }} required />
                            </div>
                            <div className="submit-btn-div">
                                { submitting ? 
                                <ThreeDots color="#32CD32" height={30} width={30} />
                                :
                                <input type="submit" value="LOGIN" onClick={e => {
                                    e.preventDefault()
                                    submit()
                                }} />
                            }
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <NavLink to="/reset-email">Forget Password?</NavLink>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm