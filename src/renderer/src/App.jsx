import { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import AddAlert from './pages/AddAlert'
import Home from './pages/Home'
import ViewAlerts from './pages/ViewAlerts'
import AddRandomAlert from './pages/AddRandomAlert';
const { ipcRenderer } = window.require("electron");



export default function AppRoutes() {

  useEffect(() => {
    ipcRenderer
      .invoke("check-and-create-config")
      .then((result) => {
        console.log(result); // "Arquivo criado!" ou "Arquivo já existe!"
      })
      .catch((error) => {
        console.error("Erro ao verificar/criar o arquivo:", error);
      });
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
