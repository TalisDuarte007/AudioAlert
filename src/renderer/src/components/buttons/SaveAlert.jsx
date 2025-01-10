import '../../styles/components/buttons/buttons.css'
import { useState } from 'react';

export default function SaveAlert({ time, disabled }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSave = () => {
    if (window.audioAlertApi && typeof window.audioAlertApi.saveToJSON === 'function') {
      window.audioAlertApi.saveToJSON(time);
    } else {
        console.error('API saveToJSON não está disponível!');
    }
};

return (
  <div
    className="save-alert-container"
    onMouseEnter={() => disabled && setShowTooltip(true)} // Exibe o tooltip se estiver desativado
    onMouseLeave={() => setShowTooltip(false)} // Oculta o tooltip
    role="tooltip" // Adiciona o papel apropriado
    aria-hidden={!showTooltip} // Indica se o tooltip está visível
  >
    <button
      className="button button-back"
      onClick={handleSave}
      disabled={disabled} // Controla se o botão está ativo
      aria-describedby={disabled ? "tooltip-message" : undefined} // Associa ao tooltip se estiver desativado
    >
      Salvar
    </button>
    {showTooltip && (
      <div className="tooltip">
        Selecione pelo menos um áudio e um dia da semana para salvar um novo alarme.
      </div>
    )}
  </div>
);
}
