import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Predict from './pages/Predict'; // You'll create this next
import About from './pages/About'; // You'll create this next
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;