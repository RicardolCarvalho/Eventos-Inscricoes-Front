import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Locais from './pages/Locais';
import Eventos from './pages/Eventos';
import Relatorio from './pages/Relatorio';
import Inscritos from './pages/Inscritos';

function App() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/locais">Locais</Link></li>
            <li><Link to="/eventos">Eventos</Link></li>
            <li><Link to="/relatorio">Relatório</Link></li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/locais" element={<Locais />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/relatorio" element={<Relatorio />} />
        <Route path="/inscritos/:eventoId" element={<Inscritos />} />
      </Routes>
    </div>
  );
}

export default App;
