import { useParams } from 'react-router-dom'

function PaginaProjeto() {
  const { id } = useParams()

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Projeto: {id}</h1>
      <p>Stub do board Kanban. Implementacao completa fica com o Ryan.</p>
    </main>
  )
}

export default PaginaProjeto
