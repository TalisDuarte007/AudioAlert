import BackButton from "../components/buttons/BackButton";
import '../styles/pages/pages.css'
import TimePicker from 'react-time-picker';
import { useState } from "react";
import 'react-time-picker/dist/TimePicker.css';
import SaveAlert from "../components/buttons/SaveAlert";
import AddAudioButton from "../components/buttons/AddAudioButton";

export default function AddAlert() {
  const [time, setTime] = useState ('10:00');
  return (
    <div className="pages-container">
      <h1>Adicionar Alerta:</h1>
      <div>
      <TimePicker
          onChange={setTime}
          value={time}
          disableClock={true}
        />
      </div>
      <AddAudioButton />
      <div className="buttons-pages-container buttons-container-row">
        <SaveAlert time={time}/>
        <BackButton/>
      </div>
    </div>
  )
}
