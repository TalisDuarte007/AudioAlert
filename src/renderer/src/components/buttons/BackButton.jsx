import { useNavigate } from 'react-router-dom'
import '../../styles/components/buttons/buttons.css'

export default function BackButton() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1) // Volta para a última página no histórico
  }

  return <button className='button button-back' onClick={handleBack}>Voltar</button>
}
