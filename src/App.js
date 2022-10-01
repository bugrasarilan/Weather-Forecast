import './App.css';
import { Route,Routes } from 'react-router-dom';
import Daily from './pages/Daily';
import Weekly from './pages/Weekly';
import Monthly from './pages/Monthly';
import Header from './pages/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Daily />} />
        <Route path="Weekly" element={< Weekly />} />
        <Route path="Monthly" element={<Monthly />} />
      </Routes>
      
    </div>
  );
}

export default App;
