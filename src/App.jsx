import React, { useState, useEffect } from 'react'
import RegisteredPackagesPage from './pages/registeredPackages'
import PackagesPage from './pages/packages'
import MembersPage from './pages/members'
import UsersPage from './pages/users'
import './index.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'

import PackageForm from './components/forms/package'
import LoginForm from './components/forms/login'
import ResetPassword from './components/forms/resetPassword'
import ResetEmail from './components/forms/resetEmail'




const App = () => {



  return (
    <div>
      <Router>
        <Routes>
          <Route path="/members-packages" element={<RegisteredPackagesPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/reset-email" element={<ResetEmail />} />
          <Route path="/reset-password/:userId" element={<ResetPassword />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;