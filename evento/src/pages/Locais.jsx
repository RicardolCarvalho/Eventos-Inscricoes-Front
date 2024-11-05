import { useState } from 'react';

function Locais() {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [dataHora, setDataHora] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você adicionaria lógica para enviar os dados
    console.log({ nome, endereco, dataHora });
  };

  return (
    <div className="locais-page">
      <div className="list">
        <h2>Locais</h2>
        <input type="text" placeholder="Buscar..." />
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Data/Hora</th>
            </tr>
          </thead>
          <tbody>
            {/* Aqui vão os dados dos locais */}
          </tbody>
        </table>
      </div>
      <div className="form">
        <h2>Criação de Locais</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome do Local"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
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

export default Locais;
