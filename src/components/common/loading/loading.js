import React from 'react'
import { Spinner } from 'react-bootstrap'
import "./loading.scss";

const Loading = () => {
  return (
    <div className="loading">
        <Spinner animation="border"/>
    </div>
  )
}

export default Loading