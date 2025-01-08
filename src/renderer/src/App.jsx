import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import AddAlerts from './pages/AddAlerts'
import Home from './pages/Home'
import ViewAlerts from './pages/ViewAlerts'

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addAlerts" element={<AddAlerts />} />
        <Route path="viewAlerts" element={<ViewAlerts />} />
      </Routes>
    </Router>
  )
}
