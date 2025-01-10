import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import AddAlert from './pages/AddAlert'
import Home from './pages/Home'
import ViewAlerts from './pages/ViewAlerts'
import AddRandomAlert from './pages/AddRandomAlert';

export default function AppRoutes() {

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
