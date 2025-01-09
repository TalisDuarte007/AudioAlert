import '../../styles/components/buttons/buttons.css'

export default function SaveAlert({ time }) {
  const handleSave = () => {
    if (window.audioAlertApi && typeof window.audioAlertApi.saveToJSON === 'function') {
      window.audioAlertApi.saveToJSON(time);
    } else {
        console.error('API saveToJSON não está disponível!');
    }
};

    
  return (
    <button className='button button-back' onClick={handleSave}>Salvar</button>
  )
}
