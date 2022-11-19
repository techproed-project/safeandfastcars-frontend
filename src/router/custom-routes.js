import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from '../components/common/scroll-to-top/scroll-to-top'
import AdminContactMessageEditPage from '../pages/admins/admin-contact-message-edit-page'
import AdminContactMessagesPage from '../pages/admins/admin-contact-messages-page'
import AdminDashboardPage from '../pages/admins/admin-dashboard-page'
import AdminReservationEditPage from '../pages/admins/admin-reservation-edit-pagei'
import AdminReservationsPage from '../pages/admins/admin-reservations-page'
import AdminUserEditPage from '../pages/admins/admin-user-edit-page'
import AdminUsersPage from '../pages/admins/admin-users-page'
import AdminVehicleEditPage from '../pages/admins/admin-vehicle-edit-page'
import AdminVehicleNewPage from '../pages/admins/admin-vehicle-new-page'
import AdminVehiclesPage from '../pages/admins/admin-vehicles-page'
import NotFoundPage from '../pages/common/not-found-page'
import UnauthorizedPage from '../pages/common/unauthorized-page'
import AboutPage from '../pages/users/about-page'
import AuthPage from '../pages/users/auth-page'
import ContactPage from '../pages/users/contact-page'
import HomePage from '../pages/users/home-page'
import PrivacyPolicyPage from '../pages/users/privacy-policy-page'
import ProfilePage from '../pages/users/profile-page'
import ReservationDetailsPage from '../pages/users/reservation-details-page'
import ReservationsPage from '../pages/users/reservations-page'
import VehicleDetailsPage from '../pages/users/vehicle-details-page'
import VehiclesPage from '../pages/users/vehicles-page'
import ProtectedRoute from './protected-route'

const CustomRoutes = () => {
  return (
    <BrowserRouter>
        <ScrollToTop/>
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

                <Route path="user">
                  <Route index element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>

                  <Route path="reservations">
                    <Route index element={<ProtectedRoute><ReservationsPage/></ProtectedRoute>}/>
                    <Route path=":reservationId" element={<ReservationDetailsPage/>}/>
                  </Route>
                </Route>

                <Route path="admin">
                  <Route index element={<ProtectedRoute admin={true}><AdminDashboardPage/></ProtectedRoute>}/>
                  
                  <Route path="users">
                    <Route index element={<ProtectedRoute admin={true}><AdminUsersPage/></ProtectedRoute>}/>
                    <Route path=":userId" element={<ProtectedRoute admin={true}><AdminUserEditPage/></ProtectedRoute>}/>
                  </Route>

                  <Route path="vehicles">
                    <Route index element={<ProtectedRoute admin={true}><AdminVehiclesPage/></ProtectedRoute>}/>
                     <Route path=":vehicleId" element={<ProtectedRoute admin={true}><AdminVehicleEditPage/></ProtectedRoute>}/>
                     <Route path="new" element={<ProtectedRoute admin={true}><AdminVehicleNewPage/></ProtectedRoute>}/>
                  </Route>

                  <Route path="reservations">
                    <Route index element={<ProtectedRoute admin={true}><AdminReservationsPage/></ProtectedRoute>}/>
                    <Route path=":reservationId" element={<ProtectedRoute admin={true}><AdminReservationEditPage/></ProtectedRoute>}/>
                  </Route>

                  <Route path="messages">
                    <Route index element={<ProtectedRoute admin={true}><AdminContactMessagesPage/></ProtectedRoute>}/>
                    <Route path=":messageId" element={<ProtectedRoute admin={true}><AdminContactMessageEditPage/></ProtectedRoute>}/>
                  </Route>
                </Route>

                <Route path="*" element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default CustomRoutes