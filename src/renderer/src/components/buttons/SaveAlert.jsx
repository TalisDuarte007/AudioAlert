import '../../styles/components/buttons/buttons.css'

export default function SaveAlert({ time }) {
    const  handleSave = () => {
        console.log(time)
    }
    
  return (
    <button className='button button-back' onClick={handleSave}>Salvar</button>
  )
}
