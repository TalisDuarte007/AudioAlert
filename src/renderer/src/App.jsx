import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import AddAlert from './pages/AddAlert'
import Home from './pages/Home'
import ViewAlerts from './pages/ViewAlerts'
import AddRandomAlert from './pages/AddRandomAlert';
import { useEffect } from 'react';
 import{ playAudioInApp } from '../../../src/main/ipc/Howler'; // Função que usa Howler.js

export default function AppRoutes() {

  useEffect(() => {
    // Escuta mensagens do backend para tocar o áudio
    if (window.audioApi) {
      window.audioApi.playAudio((audioPath) => {
        playAudioInApp(audioPath);
      });
    } else {
      console.error('API de áudio não está disponível no front-end.');
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
  )
}
