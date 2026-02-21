import { useState } from 'react'
import './App.css'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'
import { Login } from './components/Login/Login'

function App() {
  const [email, setEmail] = useState("");
  return (
    <div className='principal-page'>
      <Header />
      {
        email !== "" ? <Main email={email}/> : <Login  setEmail={setEmail}/>
      }
      
      <Footer />
    </div>
  )
}

export default App
