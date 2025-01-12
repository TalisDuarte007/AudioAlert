import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import AddAlert from './pages/AddAlert';
import Home from './pages/Home';
import ViewAlerts from './pages/ViewAlerts';
import AddRandomAlert from './pages/AddRandomAlert';
import { useEffect } from 'react';

export default function AppRoutes() {
  useEffect(() => {
    console.log('Testando API de áudio no window:');
    console.log(window.audioAlertApi);
  
    if (window.audioAlertApi) {
      window.audioAlertApi.playAudio('FORTUNA.mp3');
    } else {
      console.error('API de áudio não carregada!');
    }
  }, []);
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addAlert" element={<AddAlert />} />
        <Route path="/addRandomAlert" element={<AddRandomAlert />} />
        <Route path="/viewAlerts" element={<ViewAlerts />} />
      </Routes>
    </Router>
  );
}
