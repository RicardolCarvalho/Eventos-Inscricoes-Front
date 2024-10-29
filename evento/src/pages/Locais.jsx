import React, { useState } from 'react';

function Locais() {
  const [locais, setLocais] = useState([]);
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [capacidade, setCapacidade] = useState('');

  const handleAddLocal = () => {
    const novoLocal = { nome, endereco, capacidade };
    setLocais([...locais, novoLocal]);
    setNome('');
    setEndereco('');
    setCapacidade('');
  };

  return (
    <div>
      <h1>Locais</h1>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder="Endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
      />
      <input
        type="number"
        placeholder="Capacidade"
        value={capacidade}
        onChange={(e) => setCapacidade(e.target.value)}
      />
      <button onClick={handleAddLocal}>Adicionar Local</button>
      <ul>
        {locais.map((local, index) => (
          <li key={index}>
            {local.nome} - {local.endereco} - {local.capacidade}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Locais;
