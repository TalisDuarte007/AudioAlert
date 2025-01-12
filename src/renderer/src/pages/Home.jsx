import AddAlertButton from '../components/buttons/AddAlertButton'
import AddRandomAlertButton from '../components/buttons/AddRandomAlertButton'
import ViewAlertsButton from '../components/buttons/ViewAlertsButton'
import '../styles/pages/pages.css'
import alarm from '../../../public/audios/FORTUNA.mp3'

export default function Home() {
  

  function playAudio() {
    const audio = new Audio(alarm)
    console.log('Tentando tocar o áudio:', audio);
    audio.play()
      .then(() => console.log('Áudio tocando...'))
      .catch((error) => console.error('Erro ao tocar áudio:', error));
  }

  return (
    <div className='pages-container'>
      <h1>AudioAlert</h1>
      <div className='buttons-pages-container'>
        <AddAlertButton />
        <AddRandomAlertButton />
        <ViewAlertsButton />
        <button onClick={playAudio}>Tocar Áudio</button>
      </div>
    </div>
  )
}
