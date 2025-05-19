import './App.css'
import { useState } from 'react'

function App() {
  const [showMessage, setShowMessage] = useState(false)

  const handleClick = () => {
    setShowMessage(!showMessage)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="text-center bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 max-w-md animate-fade-in">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Care4Gender</h1>
        <p className="text-gray-700 text-base mb-6">
          Click the button below to see the magic happen!
        </p>
        <button
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:scale-105 active:scale-95 duration-200"
        >
          {showMessage ? 'Hide Message' : 'Click me'}
        </button>

        {showMessage && (
          <p className="mt-6 text-blue-800 font-medium animate-slide-up">
            💡 Simple. Clean. Effective.
          </p>
        )}
      </div>
    </div>
  )
}

export default App
