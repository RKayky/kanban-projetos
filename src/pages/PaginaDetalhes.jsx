import { useParams } from 'react-router-dom'

function PaginaDetalhes() {
  const { id } = useParams()

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Detalhes da Tarefa: {id}</h1>
      <p>Stub da pagina de detalhes. Implementacao completa fica com o Gabriel.</p>
    </main>
  )
}

export default PaginaDetalhes
