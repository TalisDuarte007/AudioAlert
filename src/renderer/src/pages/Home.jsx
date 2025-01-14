import AddAlertButton from '../components/buttons/AddAlertButton'
import AddRandomAlertButton from '../components/buttons/AddRandomAlertButton'
import ViewAlertsButton from '../components/buttons/ViewAlertsButton'
import '../styles/pages/pages.css'

export default function Home() {
    return (
    <div className='pages-container'>
      <h1>AudioAlert</h1>
      <div className='buttons-pages-container'>
        <AddAlertButton />
        <AddRandomAlertButton />
        <ViewAlertsButton />
      </div>
    </div>
  )
}
