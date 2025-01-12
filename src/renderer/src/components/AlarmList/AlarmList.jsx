import { useState, useEffect } from 'react';
import '../../styles/components/AlarmList/AlarmList.css'
export default function AlarmList() {
    const [jsonAlarms, setJsonAlarms] = useState([]);
    const [promoAlarms, setPromoAlarms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await window.audioAlertApi.readJson(); // Chama o IPC
            setJsonAlarms(data.alarms);
            setPromoAlarms(data.promo_alarms)
          } catch (error) {
            console.error('Erro ao carregar o JSON:', error);
          }
        };
        fetchData();
      }, []);

    return (
        <div>
          {jsonAlarms.length > 0 ? (
            <div className="scrollable-container">
              {jsonAlarms.map((alarm) => (
                <div key={alarm.time + alarm.days} className="alarm-item">
                  <p>Hora: {alarm.time}</p>
                  <p>Dias: {alarm.days.join(' ')}</p>
                  <p>Alarme: {alarm.audioPath.split('\\').pop().replace('.mp3', '')}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Carregando dados...</p>
          )}
        </div>
      );
}
