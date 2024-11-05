import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Inscritos() {
  const { eventoId } = useParams();
  const [inscritos, setInscritos] = useState([]);
  const [usuarioMap, setUsuarioMap] = useState({});
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchInscritos() {
      try {
        // Faz a requisição para buscar todas as inscrições do evento específico
        const responseInscricoes = await fetch(`http://localhost:8081/projeto/v1/inscricoes/evento/${eventoId}`);
        if (!responseInscricoes.ok) throw new Error("Erro ao buscar inscrições");

        const dataInscricoes = await responseInscricoes.json();
        const inscritosEvento = dataInscricoes.content.filter(inscricao => inscricao.evento === eventoId);
        
        setInscritos(inscritosEvento); // Atualiza o estado com as inscrições filtradas
      } catch (error) {
        setErro(error.message);
      }
    }

    async function fetchUsuarios() {
      try {
        // Faz a requisição para buscar todos os usuários
        const responseUsuarios = await fetch(`http://localhost:8081/projeto/v1/usuario`);
        if (!responseUsuarios.ok) throw new Error("Erro ao buscar usuários");

        const dataUsuarios = await responseUsuarios.json();
        
        // Cria um mapa de usuários { usuarioId: nome }
        const usuarioMapTemp = {};
        dataUsuarios.content.forEach(usuario => {
          usuarioMapTemp[usuario.id] = usuario.nome;
        });

        setUsuarioMap(usuarioMapTemp);
      } catch (error) {
        setErro(error.message);
      }
    }

    fetchInscritos();
    fetchUsuarios();
  }, [eventoId]);

  return (
    <div>
      <h1>Inscritos no Evento</h1>
      {erro ? (
        <p>Erro: {erro}</p>
      ) : (
        <ul>
          {inscritos.map((inscrito) => (
            <li key={inscrito.id}>
              Nome: {usuarioMap[inscrito.usuario] || "Desconhecido"} - Ativo: {inscrito.active ? "Sim" : "Não"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Inscritos;
