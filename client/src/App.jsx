import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("Chargement...")

  useEffect(() => {
    // On appelle la route qu'on a créée dans Express
    fetch('/api/test') 
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => setMessage("Erreur de connexion au serveur"))
  }, [])

  return (
    <div className="App">
      <h1>Mon Projet Fullstack</h1>
      <div className="card">
        <p>Réponse du serveur : <strong>{message}</strong></p>
      </div>
    </div>
  )
}

export default App