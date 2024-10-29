import { Routes, Route, Link } from 'react-router-dom';
import Locais from './pages/Locais';
import Eventos from './pages/Eventos';
import Relatorio from './pages/Relatorio';
import Inscritos from './pages/Inscritos';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <Link to="/locais">Locais</Link> | 
          <Link to="/eventos">Eventos</Link> | 
          <Link to="/relatorio">Relatório</Link>
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

export default App