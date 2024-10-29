// src/pages/Inscritos.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

function Inscritos() {
  const { eventoId } = useParams(); // Pega o ID do evento via URL
  const [inscritos, setInscritos] = useState([]);

  useEffect(() => {
    fetchInscritos();
  }, [eventoId]);

  const fetchInscritos = async () => {
    try {
      const response = await api.get(`/eventos/${eventoId}/inscritos`);
      setInscritos(response.data);
    } catch (error) {
      console.error('Erro ao buscar inscritos:', error);
    }
  };

  return (
    <div>
      <h1>Inscritos no Evento</h1>
      {inscritos.length === 0 ? (
        <p>Não há inscritos para este evento.</p>
      ) : (
        <ul>
          {inscritos.map((inscrito) => (
            <li key={inscrito.id}>
              {inscrito.nome} - {inscrito.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Inscritos;
