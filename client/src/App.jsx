import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState([]);
  const [newProject, setProject] = useState({nom : "" , status : "En cours"})

  useEffect(() => {
    fetch('/api/projets') 
      .then(res => res.json())
      .then(data => setMessage(data))
      .catch(err => setMessage("Erreur de connexion au serveur"))
  }, [])

  const handleChange = (e) => {
    const nom = e.target.name;
    const value = e.target.value;

    setProject((prev) => ({
      ...prev,
      [nom] : value
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault(); 
    try {
      const response = await fetch('/api/projets', {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(newProject)
      })
      if(! response.ok) {
        throw new Error("Erreur serveur")
      }

      const data = await response.json();
      console.log("Projet ajouté " + data)

      setMessage((prev) => [...prev, data])
      setProject({nom : " "})
    }
    catch (error){
      console.error(error)
    }
  }

  const handleDelete = (e) => {
    e.preventDefault();
    
  }
  return (
    <div className="App">
      <h1>Mon Projet Fullstack</h1>
      <div className="card">
        <div>Réponse du serveur : <strong>{message && message.map(m => (
          <span key={m.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h3>{m.nom}</h3>
            <p>Statut : <strong>{m.statut}</strong></p>
            <button onClick={handleDelete}>Supprimer</button>
          </span>
        ))}
          </strong></div>
      </div>

      <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="nom" 
          placeholder="Entrez le nom du projet"
          onChange={handleChange} 
        />
        <button type='submit'>
          Valider
        </button>
      </form>
      </div>
    </div>
  )
}

export default App