import { useState } from 'react';
import '../../styles/components/WeekdaySelector/WeekdaySelector.css'; // Crie um arquivo CSS para estilizar

const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export default function WeekdaySelector({ selectedDays, setSelectedDays }) {
  const toggleDay = (day) => {
    setSelectedDays((prevDays) => {
      if (prevDays.includes(day)) {
        const newDays = prevDays.filter((d) => d !== day);
        return newDays.length > 0 ? newDays : prevDays; // Garante que pelo menos um dia seja selecionado
      } else {
        return [...prevDays, day];
      }
    });
  };

  return (
    <div className="weekday-selector">
      {weekdays.map((day) => (
        <label key={day} className="weekday-item">
          <input
            type="checkbox"
            checked={selectedDays.includes(day)}
            onChange={() => toggleDay(day)}
          />
          {day}
        </label>
      ))}
    </div>
  );
}
