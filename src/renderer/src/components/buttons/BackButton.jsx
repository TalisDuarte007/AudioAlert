import { useNavigate } from 'react-router-dom'

export default function BackButton() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1) // Volta para a última página no histórico
  }

  return <button onClick={handleBack}>Voltar</button>
}
