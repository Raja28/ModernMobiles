import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
// import './App.css'
import HomePage from './components/HomePage';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <HomePage/>
    <Footer/>
    </>
  )
}

export default App
