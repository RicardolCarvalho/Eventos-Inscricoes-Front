import React, { useState } from 'react';

function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');

  const handleAddEvento = () => {
    const novoEvento = { nome, data, local };
    setEventos([...eventos, novoEvento]);
    setNome('');
    setData('');
    setLocal('');
  };

  return (
    <div>
      <h1>Eventos</h1>
      <input
        type="text"
        placeholder="Nome do Evento"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="datetime-local"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <input
        type="text"
        placeholder="Local"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
      />
      <button onClick={handleAddEvento}>Adicionar Evento</button>
      <ul>
        {eventos.map((evento, index) => (
          <li key={index}>{evento.nome} - {evento.data} - {evento.local}</li>
        ))}
      </ul>
    </div>
  );
}

export default Eventos;
