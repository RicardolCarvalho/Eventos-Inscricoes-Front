import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Inscritos() {
  const { eventoId } = useParams();
  const [inscritos, setInscritos] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchInscritos = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/eventos/${eventoId}/participantes`);
        const data = await response.json();
        setInscritos(data);
      } catch (error) {
        console.error("Erro ao buscar inscritos:", error);
      }
    };

    fetchInscritos();
  }, [eventoId]);

  const handleAddParticipante = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8080/api/v1/eventos/${eventoId}/participantes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(email)
      });
      setInscritos([...inscritos, { email }]);
      setEmail('');
    } catch (error) {
      console.error("Erro ao adicionar participante:", error);
    }
  };

  return (
    <div>
      <h1>Inscritos no Evento</h1>
      <ul>
        {inscritos.map((inscrito, index) => (
          <li key={index}>{inscrito.nome} - {inscrito.email}</li>
        ))}
      </ul>
      <form onSubmit={handleAddParticipante}>
        <input
          type="email"
          placeholder="Email do Participante"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Adicionar Participante</button>
      </form>
    </div>
  );
}

export default Inscritos;
