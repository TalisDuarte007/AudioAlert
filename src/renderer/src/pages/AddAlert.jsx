import BackButton from "../components/buttons/BackButton";
import '../styles/pages/pages.css'
import TimePicker from 'react-time-picker';
import { useState } from "react";
import 'react-time-picker/dist/TimePicker.css';
import SaveAlert from "../components/buttons/SaveAlert";
import AddAudioButton from "../components/buttons/AddAudioButton";
import WeekdaySelector from "../components/WeekdaySelector/WeekdaySelector";

export default function AddAlert() {
  const [time, setTime] = useState({ time: '10:00', audioPath: '' });
  const [selectedDays, setSelectedDays] = useState([]);

  const isSaveDisabled = !time.audioPath || selectedDays.length === 0;

  return (
    <div className="pages-container">
      <h1>Adicionar Alerta:</h1>
      <div>
        <TimePicker
          onChange={(newTime) => setTime((prevState) => ({ ...prevState, time: newTime }))}
          value={time.time}
          disableClock={true}
        />
      </div>
      <WeekdaySelector selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
      <AddAudioButton setTime={setTime} />
      <div className="buttons-pages-container buttons-container-row">
        <SaveAlert time={{ ...time, days: selectedDays }} disabled={isSaveDisabled} />
        <BackButton />
      </div>
    </div>
  );
}
