import React, { useState, useEffect } from 'react'
import NavBar from '../components/navBar/navBar'
import SideBar from '../components/sideBar/sideBar'
import PackagesTable from '../components/tables/packages'
import PackageForm from '../components/forms/package'
import { useNavigate } from 'react-router-dom'



const RegisteredPackagesPage = () => {

  const navigate = useNavigate()

  const [showForm, setShowForm] = useState(false)
  const [authorized, setAuthorized] = useState(false)

  const openForm = () => {
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
  }

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
          {showForm ? <PackageForm closeForm={closeForm} /> : null}
          <NavBar />
          <div className="page-layout">
            <SideBar />
            <div className="page-main">
              <div className="table-container">
                <PackagesTable openForm={openForm} />
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