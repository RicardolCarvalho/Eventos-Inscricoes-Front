import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Inscritos() {
  const { eventoId } = useParams();
  const [inscritos, setInscritos] = useState([]);

  useEffect(() => {
    setInscritos([
      { nome: 'Carlos Hernani', email: 'carlos@example.com' },
      { nome: 'Larissa Luana', email: 'larissa@example.com' },
    ]);
  }, [eventoId]);

  return (
    <div>
      <h1>Inscritos no Evento</h1>
      <ul>
        {inscritos.map((inscrito, index) => (
          <li key={index}>{inscrito.nome} - {inscrito.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Inscritos;
