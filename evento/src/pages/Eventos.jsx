import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Eventos() {
  const [nome, setNome] = useState('');
  const [localId, setLocalId] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [eventos, setEventos] = useState([]);
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    fetchEventos();
    fetchLocais();
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/eventos');
      const data = await response.json();
      setEventos(data.content);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

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

    if (!nome || !localId || !dataHora || !capacidade) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const eventoData = {
      nome,
      localId,
      dataHora,
      capacidade: parseInt(capacidade, 10)
    };

    try {
      const response = await fetch('http://localhost:8080/api/v1/eventos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventoData)
      });

      if (response.ok) {
        console.log("Evento criado com sucesso!");
        setNome('');
        setLocalId('');
        setDataHora('');
        setCapacidade('');
        fetchEventos();
      }
    } catch (error) {
      console.error("Erro ao criar evento:", error);
    }
  };

  return (
    <div className="eventos-page">
      <div className="list">
        <h2>Eventos</h2>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Local</th>
              <th>Data/Hora</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento) => (
              <tr key={evento.id}>
                <td>
                  <Link to={`/eventos/${evento.id}/inscritos`}>{evento.nome}</Link>
                </td>
                <td>{evento.localNome}</td>
                <td>{evento.dataHora}</td>
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
            required
          />
          <select value={localId} onChange={(e) => setLocalId(e.target.value)} required>
            <option value="">Selecione um Local</option>
            {locais.map((local) => (
              <option key={local.id} value={local.id}>
                {local.nome}
              </option>
            ))}
          </select>
          <input
            type="datetime-local"
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
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

export default Eventos;
