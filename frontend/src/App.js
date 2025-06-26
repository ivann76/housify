import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Predict from './pages/Predict';
import About from './pages/About';
import Trends from './pages/Trends';
import './App.css';
import History from "./pages/History";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Predict />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/history" element={<History />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;