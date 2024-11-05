// src/pages/Eventos.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [localId, setLocalId] = useState('');
  const [locais, setLocais] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEventos();
    fetchLocais();
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await api.get('/api/v1/eventos');
      setEventos(response.data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };

  const fetchLocais = async () => {
    try {
      const response = await api.get('/api/v1/locais');
      setLocais(response.data);
    } catch (error) {
      console.error('Erro ao buscar locais:', error);
    }
  };

  const handleAddEvento = async () => {
    try {
      const novoEvento = { nome, data, localId };
      await api.post('/eventos', novoEvento);
      fetchEventos();
      setNome('');
      setData('');
      setLocalId('');
    } catch (error) {
      console.error('Erro ao adicionar evento:', error);
    }
  };

  const handleNavigateToInscritos = (id) => {
    navigate(`/inscritos/${id}`);
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
      <select value={localId} onChange={(e) => setLocalId(e.target.value)}>
        <option value="">Selecione um local</option>
        {locais.map((local) => (
          <option key={local.id} value={local.id}>
            {local.nome}
          </option>
        ))}
      </select>
      <button onClick={handleAddEvento}>Adicionar Evento</button>
      <ul>
        {eventos.map((evento) => (
          <li key={evento.id}>
            {evento.nome} - {evento.data} - {evento.localNome}
            <button onClick={() => handleNavigateToInscritos(evento.id)}>
              Ver Inscritos
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Eventos;
