import { useState } from 'react'
import Login from './assets/Login.jsx'
import Resg from './assets/Resg.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Resg/>
        <Login/>
      </div>
    </>
  )
}

export default App
