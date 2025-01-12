import AlarmList from '../components/AlarmList/AlarmList'
import BackButton from '../components/buttons/BackButton'
import '../styles/pages/pages.css'

export default function ViewAlerts() {
  return (
    <div className='pages-container'>
      <h1>Alertas Programados</h1>
      <AlarmList/>
      <div className='buttons-pages-container buttons-container-row'>
        <BackButton/>
      </div>
    </div>
  )
}
