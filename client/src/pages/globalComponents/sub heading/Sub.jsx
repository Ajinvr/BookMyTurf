import React from 'react'

function Sub({text}) {
  return (
    <div>
        <h1 style={{fontFamily:"sub"}} className=' text-3xl mt-5 p-10 text-secondary'>{text}</h1>
    </div>
  )
}

export default Sub