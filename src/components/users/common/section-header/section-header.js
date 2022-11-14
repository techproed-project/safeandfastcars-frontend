import React from 'react'
import "./section-header.scss"
const SectionHeader = (props) => {
    const {title,subtitle,desc,alignment} = props;
  return (
    <div className="section-header" style={{textAlign : alignment || "center"}}>
        <h5>{subtitle}</h5>
        <h2>{title}</h2>
        <p>{desc}</p>
    </div>
  )
}

export default SectionHeader
