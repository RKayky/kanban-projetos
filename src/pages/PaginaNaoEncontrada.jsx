import { Link } from 'react-router-dom'

function PaginaNaoEncontrada() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>404 - Pagina nao encontrada</h1>
      <Link to="/">Voltar para inicio</Link>
    </main>
  )
}

export default PaginaNaoEncontrada
