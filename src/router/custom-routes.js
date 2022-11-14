import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFoundPage from '../pages/common/not-found-page'
import UnauthorizedPage from '../pages/common/unauthorized-page'
import AboutPage from '../pages/users/about-page'
import AuthPage from '../pages/users/auth-page'
import ContactPage from '../pages/users/contact-page'
import HomePage from '../pages/users/home-page'
import PrivacyPolicyPage from '../pages/users/privacy-policy-page'
import VehicleDetailsPage from '../pages/users/vehicle-details-page'
import VehiclesPage from '../pages/users/vehicles-page'

const CustomRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<HomePage/>}/>
                <Route path="about" element={<AboutPage/>}/>
                <Route path="auth" element={<AuthPage/>}/>
                <Route path="contact" element={<ContactPage/>}/>
                <Route path="privacy-policy" element={<PrivacyPolicyPage/>}/>
                <Route path="unauthorized" element={<UnauthorizedPage/>}/>

                <Route path="vehicles">
                  <Route index element={<VehiclesPage/>}/>
                  <Route path=":vehicleId" element={<VehicleDetailsPage/>}/>
                </Route>



                <Route path="*" element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default CustomRoutes