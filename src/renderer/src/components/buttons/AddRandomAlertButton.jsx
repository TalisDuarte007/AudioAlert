import { Link } from "react-router-dom"
import '../../styles/components/buttons/buttons.css'

export default function AddRandomAlertButton () {
  return (
    <Link to="/addRandomAlert">
        <button className='button button-AddRandomAlert'>Adicionar Anúncio</button>
    </Link>
  )
}
