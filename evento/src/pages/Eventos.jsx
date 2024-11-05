import { useState } from 'react';

function Eventos() {
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [dataHora, setDataHora] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Adicionar lógica para enviar dados
    console.log({ nome, local, dataHora });
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
            </tr>
          </thead>
          <tbody>
            {/* Aqui vão os dados dos eventos */}
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
      <button>Relatório</button>
    </div>
  );
}

export default Eventos;
