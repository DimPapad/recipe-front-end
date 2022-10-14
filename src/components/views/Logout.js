import React from 'react'

function Logout(props) {
  return (
    <div>
      {props.changeDocTitle("Logout")}
      <h1>You are Logged out</h1>
    </div>
  )
}

export default Logout