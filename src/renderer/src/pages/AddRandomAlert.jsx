import BackButton from "../components/buttons/BackButton";
import '../styles/pages/pages.css'

export default function AddRandomAlert() {
  return (
    <div className="pages-container">
        <h1>Adicionar Anúncio</h1>
        <div className="buttons-pages-container buttons-container-row">
          <BackButton/>
        </div>
    </div>
  )
}
