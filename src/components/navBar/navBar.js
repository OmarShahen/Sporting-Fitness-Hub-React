import React from 'react'
import './navBar.css'

const NavBar = () => {

    const admin = JSON.parse(localStorage.getItem('admin'))
    const username = admin.username

    return (
        <div className="navigation-bar">
            <div>
                <strong>Sporting Fitness Hub</strong>
            </div>
            <div className="navigation-bar-right-side">
                <ul>
                    <li><span>{username}</span></li>
                    <li><img src={`https://avatars.dicebear.com/api/initials/${username}.svg`} alt="avatar" /></li>
                </ul>
            </div>
        </div>
    )
}

export default NavBar