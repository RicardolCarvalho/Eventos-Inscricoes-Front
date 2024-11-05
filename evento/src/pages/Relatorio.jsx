import React, { useState } from 'react';

function Relatorio() {
  const [relatorios, setRelatorios] = useState([]);

  const gerarRelatorio = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/locais/{id}/relatorio');
      const data = await response.json();
      setRelatorios(data.content);
    } catch (error) {
      console.error("Erro ao gerar o relatório:", error);
    }
  };

  return (
    <div>
      <h1>Relatório por Local</h1>
      <button onClick={gerarRelatorio}>Gerar Relatório</button>
      <ul>
        {relatorios.map((relatorio, index) => (
          <li key={index}>
            <h2>{relatorio.localNome}</h2>
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
