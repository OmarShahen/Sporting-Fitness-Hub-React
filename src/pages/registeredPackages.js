import React, { useState, useEffect } from 'react'
import NavBar from '../components/navBar/navBar'
import SideBar from '../components/sideBar/sideBar'
import RegisteredPackagesTable from '../components/tables/registeredPackages'
import { useNavigate } from 'react-router-dom'



const RegisteredPackagesPage = () => {

  const navigate = useNavigate()

  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {

    const accessToken = JSON.parse(localStorage.getItem('accessToken'))

    if(!accessToken) {
      setAuthorized(false)
      navigate('/login')
      return 
    }

    setAuthorized(true)

  }, [authorized])

    return (
        <div>
          { authorized ? 
          <div>
          <NavBar />
          <div className="page-layout">
            <SideBar />
            <div className="page-main">
              <div className="table-container">
                <RegisteredPackagesTable />
              </div>
            </div>
          </div>
        </div>
        :
        null  
        }
        </div>
      )
}

export default RegisteredPackagesPage