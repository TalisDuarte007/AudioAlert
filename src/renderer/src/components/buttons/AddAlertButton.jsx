import { Link } from 'react-router-dom'

export default function AddAlertButton() {
  return (
    <Link to="/addAlerts">
      <button>Adicionar Alerta</button>
    </Link>
  )
}
