import { useState, useEffect } from 'react';
import api from '../api/axios';

function Relatorio() {
const [relatorios, setRelatorios] = useState([]);

useEffect(() => {
fetchRelatorio();
}, []);

const fetchRelatorio = async () => {
try {
    const response = await api.get('/relatorio');
    setRelatorios(response.data);
} catch (error) {
    console.error('Erro ao buscar relatório:', error);
}
};

return (
<div>
    <h1>Relatório por Local</h1>
    <ul>
    {relatorios.map((relatorio) => (
        <li key={relatorio.localId}>
        <h2>{relatorio.localNome}</h2>
        <p>Quantidade de eventos: {relatorio.quantidade}</p>
        <ul>
            {relatorio.eventos.map((evento) => (
            <li key={evento.id}>{evento.nome}</li>
            ))}
        </ul>
        </li>
    ))}
    </ul>
</div>
);
}

export default Relatorio