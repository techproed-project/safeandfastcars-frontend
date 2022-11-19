import React from 'react'
import logo from "../../assets/img/logo/logo-white.png"
import "./loading-page.scss"
import {Spinner} from "react-bootstrap"
const LoadingPage = () => {
  return (
    <div className="loading-page">
       <Spinner animation="border" variant="primary"/>
       <img src={logo} alt="Loading..." />
    </div>
  )
}

export default LoadingPage