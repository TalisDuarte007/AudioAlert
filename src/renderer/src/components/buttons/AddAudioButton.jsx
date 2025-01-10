import '../../styles/components/buttons/buttons.css'

export default function AddAudioButton({ setTime }) {
  const handleAddAudio = async () => {
    if (window.openDialogApi?.selectFile) {
      const filePath = await window.openDialogApi.selectFile(); // Chama a API para abrir o diálogo
      if (filePath) {
        setTime((prevState) => ({ ...prevState, audioPath: filePath })); // Atualiza o caminho do áudio no estado
        console.log('Arquivo selecionado:', filePath);
      }
    } else {
      console.error('API selectFile não disponível!');
    }
  };

  return (
    <button className="button" onClick={handleAddAudio}>
      Adicionar Áudio
    </button>
  );
}
