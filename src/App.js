import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "Meu Repositorio",
      url: "https://github.com/greysonrzf/gochallenge_repo_backend",
      techs: ["NodeJs", "JavaScript"]
    })



    setRepositories([...repositories, response.data])
  }


  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    const updatedRepositories = repositories.filter(repository => repository.id !== id)

    setRepositories(updatedRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <div className="repositoryContainer">
              <p className="title">{repository.title}</p>
              <p className="text">{repository.techs.join(', ')}</p>
              <p className="text">{repository.url}</p>
            </div>

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
