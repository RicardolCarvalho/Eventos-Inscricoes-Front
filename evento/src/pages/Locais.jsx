import { useState, useEffect } from 'react';
import api from '../api/axios';

function Locais() {
  const [locais, setLocais] = useState([]);
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [capacidade, setCapacidade] = useState('');

  useEffect(() => {
    fetchLocais();
  }, []);

  const fetchLocais = async () => {
    try {
      const response = await api.get('/locais');
      setLocais(response.data);
    } catch (error) {
      console.error('Erro ao buscar locais:', error);
    }
  };

  const handleAddLocal = async () => {
    try {
      const novoLocal = { nome, endereco, capacidade };
      await api.post('/locais', novoLocal);
      fetchLocais();
      setNome('');
      setEndereco('');
      setCapacidade('');
    } catch (error) {
      console.error('Erro ao adicionar local:', error);
    }
  };

  const handleDeleteLocal = async (id) => {
    try {
      await api.delete(`/locais/${id}`);
      fetchLocais();
    } catch (error) {
      console.error('Erro ao excluir local:', error);
    }
  };

  return (
    <div>
      <h1>Locais</h1>
      <input
        type="text"
        placeholder="Nome"
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
        type="number"
        placeholder="Capacidade"
        value={capacidade}
        onChange={(e) => setCapacidade(e.target.value)}
      />
      <button onClick={handleAddLocal}>Adicionar Local</button>
      <ul>
        {locais.map((local) => (
          <li key={local.id}>
            {local.nome} - {local.endereco} - {local.capacidade}
            <button onClick={() => handleDeleteLocal(local.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Locais;
