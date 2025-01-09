import { Link } from 'react-router-dom'
import '../../styles/components/buttons/buttons.css'

export default function AddAlertButton() {
  return (
    <Link to="/addAlert">
      <button className='button button-addAlert'>Adicionar Alerta</button>
    </Link>
  )
}
