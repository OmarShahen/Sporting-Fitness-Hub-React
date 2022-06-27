import React from 'react'
import './sideBar.css'
import BadgeIcon from '@mui/icons-material/Badge'
import GroupIcon from '@mui/icons-material/Group'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import CardMembershipIcon from '@mui/icons-material/CardMembership'
import LogoutIcon from '@mui/icons-material/Logout'
import { NavLink } from 'react-router-dom'

const SideBar = () => {

    return (
        <div className="side-bar">
            <ul>
                <li>
                    <NavLink to="/members-packages">
                        <CardMembershipIcon />
                        Bookings
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/packages">
                        <FitnessCenterIcon />
                        Packages
                    </NavLink>
                </li>
                <li>
                <NavLink to="/users">
                    <GroupIcon />
                    Users
                </NavLink>
                </li>
                <li>
                    <NavLink to="/members">
                        <BadgeIcon />
                        Members
                    </NavLink>
                </li>
                <li className="side-bar-logout">
                        <NavLink to="/login" onClick={ e => {
                            localStorage.setItem('accessToken', null)
                        }}>
                            <LogoutIcon />
                            Logout  
                        </NavLink>  
                </li>
            </ul>
        </div>
    )
}

export default SideBar