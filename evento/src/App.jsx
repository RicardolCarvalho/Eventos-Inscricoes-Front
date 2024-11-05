import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import Eventos from './pages/Eventos';
import Inscritos from './pages/Inscritos';
import Locais from './pages/Locais';
import Relatorio from './pages/Relatorio';
import './App.css'; 

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Lobby />} /> {/* Define Lobby como a página inicial */}
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/eventos/:eventoId/inscritos" element={<Inscritos />} /> {/* Ajuste aqui */}
        <Route path="/locais" element={<Locais />} />
        <Route path="/relatorio" element={<Relatorio />} />
      </Routes>
    </Router>
  );
}

// Componente Lobby, que serve como tela inicial
function Lobby() {
  return (
    <div className="lobby">
      <h1 className="lobby-title">LOBBY</h1>
      <div className="button-container">
        <Link to="/locais">
          <button className="lobby-button">LOCAIS</button>
        </Link>
        <Link to="/eventos">
          <button className="lobby-button">EVENTOS</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
