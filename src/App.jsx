import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './components/Register'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App-Container">
    <h1 style={{backgroundColor:'red',color:'white'}}><center>MERN FORNTEND</center></h1>
    <Register/>
    <h3 style={{backgroundColor:'red',color:'white'}}><center>This is the Footer</center></h3>
    </div>
  )
}

export default App

