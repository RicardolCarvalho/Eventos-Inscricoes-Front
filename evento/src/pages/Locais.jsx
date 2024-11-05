import React, { useState, useEffect } from 'react';

function Locais() {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    const fetchLocais = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/locais');
        const data = await response.json();
        setLocais(data.content);
      } catch (error) {
        console.error("Erro ao buscar locais:", error);
      }
    };

    fetchLocais();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:8080/api/v1/locais', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, endereco })
      });
      setNome('');
      setEndereco('');
      // Recarregar locais
      fetchLocais();
    } catch (error) {
      console.error("Erro ao criar local:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/v1/locais/${id}`, { method: 'DELETE' });
      setLocais(locais.filter(local => local.id !== id));
    } catch (error) {
      console.error("Erro ao deletar local:", error);
    }
  };

  return (
    <div className="locais-page">
      <div className="list">
        <h2>Locais</h2>
        <input type="text" placeholder="Buscar..." />
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {locais.map((local, index) => (
              <tr key={index}>
                <td>{local.nome}</td>
                <td>{local.endereco}</td>
                <td>
                  <button onClick={() => handleDelete(local.id)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="form">
        <h2>Criação de Locais</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome do Local"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
          <button type="submit">Criar</button>
        </form>
      </div>
    </div>
  );
}

export default Locais;
