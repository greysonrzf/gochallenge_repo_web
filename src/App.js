import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    loadRepositories()
  }, [repositories])

  async function loadRepositories() {
    const { data } = await api.get('/repositories')

    setRepositories(data)
  }

  async function handleAddRepository() {
    const data = {
      title: "Meu Repositorio",
      url: "https://github.com/greysonrzf/gochallenge_repo_backend",
      techs: ["NodeJs", "JavaScript"]
    }

    loadRepositories()
    try {
      await api.post('/repositories', data)
    } catch (err) {
      console.log(err)
    }

  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    loadRepositories()
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
