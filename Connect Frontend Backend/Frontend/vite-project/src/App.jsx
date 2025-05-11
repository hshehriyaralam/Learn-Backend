import { useEffect, useState, } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"

function App() {
   const [employes, setEmployes] = useState([])

   useEffect(() => {
    axios.get('/api/employes')
    .then((response) => {
      setEmployes(response.data)
    })
    .catch((error) => {
      console.log(error);
      
    })
   })
  return (
  <div>
  <h1>Employes</h1>
  <p>Employe : {employes.length}</p>
  {
    employes.map((employe,index) => (
      <div key={employe.id}>
        <p>Name:{employe.Name}</p>
        <p>Depart: {employe.Depart}</p>
      </div>
    ))
  }
  </div>
  )
}

export default App
