import React, { useState, useEffect } from 'react';

function Eventos() {
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/eventos');
        const data = await response.json();
        setEventos(data.content);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    fetchEventos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:8080/api/v1/eventos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, local, dataHora })
      });
      setNome('');
      setLocal('');
      setDataHora('');
      // Recarregar eventos
      fetchEventos();
    } catch (error) {
      console.error("Erro ao criar evento:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/v1/eventos/${id}`, { method: 'DELETE' });
      setEventos(eventos.filter(evento => evento.id !== id));
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
    }
  };

  return (
    <div className="eventos-page">
      <div className="list">
        <h2>Eventos</h2>
        <input type="text" placeholder="Buscar..." />
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Local</th>
              <th>Data/Hora</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento, index) => (
              <tr key={index}>
                <td>{evento.nome}</td>
                <td>{evento.localNome}</td>
                <td>{evento.dataHora}</td>
                <td>
                  <button onClick={() => handleDelete(evento.id)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="form">
        <h2>Criação de Eventos</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome do Evento"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="Local"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          />
          <input
            type="datetime-local"
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
          />
          <button type="submit">Criar</button>
        </form>
      </div>
    </div>
  );
}

export default Eventos;
