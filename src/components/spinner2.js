import React from 'react'
// import "./Spinner.css"
import { ClockLoader } from 'react-spinners'
const Spinner = () => {
  return (
    <div className="m-5 ">
      <ClockLoader />
      <div>Loading....</div>
    </div>
  )
}

export default Spinner
