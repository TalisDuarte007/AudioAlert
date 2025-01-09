import { Link } from 'react-router-dom'
import '../../styles/components/buttons/buttons.css'

export default function ViewAlertsButton() {
  return (
    <Link to="/viewAlerts">
      <button className='button button-viewAlerts'>Visualizar Alertas</button>
    </Link>
  )
}
