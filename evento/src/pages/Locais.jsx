import React, { useState, useEffect } from 'react';

function Locais() {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    fetchLocais();
  }, []);

  const fetchLocais = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/locais');
      const data = await response.json();
      setLocais(data.content);
    } catch (error) {
      console.error("Erro ao buscar locais:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const localData = { nome, endereco, capacidade: parseInt(capacidade, 10) };

    try {
      const response = await fetch('http://localhost:8080/api/v1/locais', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localData)
      });

      if (response.ok) {
        console.log("Local criado com sucesso!");
        setNome('');
        setEndereco('');
        setCapacidade('');
        fetchLocais(); // Atualizar lista de locais após criação
      }
    } catch (error) {
      console.error("Erro ao criar local:", error);
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
              <th>Capacidade</th>
            </tr>
          </thead>
          <tbody>
            {locais.map((local, index) => (
              <tr key={index}>
                <td>{local.nome}</td>
                <td>{local.endereco}</td>
                <td>{local.capacidade}</td>
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
            required
          />
          <input
            type="text"
            placeholder="Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Capacidade"
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
            required
          />
          <button type="submit">Criar</button>
        </form>
      </div>
    </div>
  );
}

export default Locais;
