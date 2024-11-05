import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Inscritos() {
  const { eventoId } = useParams();
  const [inscritos, setInscritos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchInscritos() {
      try {
        // Faz a requisição para buscar todos os usuários
        const responseUsuarios = await fetch(`http://localhost:8081/projeto/v1/usuario`);
        
        if (!responseUsuarios.ok) {
          const errorText = await responseUsuarios.text();
          console.error("Erro ao buscar usuários:", errorText);
          throw new Error(`Erro ao buscar usuários: ${errorText}`);
        }

        // Parse da resposta JSON e acesso à lista de usuários em 'content'
        const todosUsuarios = await responseUsuarios.json();

        // Filtrar usuários que possuem o eventoId desejado (verifique se o campo existe)
        const usuariosInscritos = todosUsuarios.content.filter(usuario =>
          usuario.eventoId === eventoId // Certifique-se de que 'eventoId' seja o campo correto
        );

        setInscritos(usuariosInscritos);
      } catch (error) {
        setErro(error.message);
      }
    }

    fetchInscritos();
  }, [eventoId]);

  return (
    <div>
      <h1>Inscritos no Evento</h1>
      {erro ? (
        <p>Erro: {erro}</p>
      ) : (
        <ul>
          {inscritos.map((inscrito, index) => (
            <li key={index}>{inscrito.nome} - {inscrito.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Inscritos;
