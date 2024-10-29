import React, { useState } from 'react';

function Relatorio() {
  const [relatorios, setRelatorios] = useState([]);

  const gerarRelatorio = () => {
    setRelatorios([
      { local: 'Local 1', quantidade: 2, eventos: ['Evento A', 'Evento B'] },
      { local: 'Local 2', quantidade: 1, eventos: ['Evento C'] },
    ]);
  };

  return (
    <div>
      <h1>Relatório por Local</h1>
      <button onClick={gerarRelatorio}>Gerar Relatório</button>
      <ul>
        {relatorios.map((relatorio, index) => (
          <li key={index}>
            <h2>{relatorio.local}</h2>
            <p>Quantidade de eventos: {relatorio.quantidade}</p>
            <ul>
              {relatorio.eventos.map((evento, idx) => (
                <li key={idx}>{evento}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Relatorio;
