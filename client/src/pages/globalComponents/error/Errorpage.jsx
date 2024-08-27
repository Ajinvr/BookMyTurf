import React from 'react'

function Errorpage() {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">500</h1>
        <p className="mt-4 text-xl text-gray-600">Oops! Something went wrong on our end.</p>
        <p className="mt-2 text-gray-600">Please try again later.</p>
        <a
          href="/"
          className="inline-block mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Go Back Home
        </a>
      </div>
    </div>
  )
}

export default Errorpage